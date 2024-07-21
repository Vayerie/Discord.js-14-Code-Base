const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = async (message, pages, time = 30 * 1000) => {
    try {
        if (!message || !pages || pages.length === 0) throw new Error('Invalid arguments');

        let index = 0;

        if (pages.length === 1) {
            await message.channel.send({ embeds: [pages[0]] })
            return;
        }

        const prev = new ButtonBuilder().setCustomId('prev').setLabel('PREV').setStyle(ButtonStyle.Success).setDisabled(true);
        const next = new ButtonBuilder().setCustomId('next').setLabel('NEXT').setStyle(ButtonStyle.Success);
        const counter = new ButtonBuilder().setCustomId('count').setLabel(`${index + 1}/${pages.length}`).setStyle(ButtonStyle.Secondary).setDisabled(true);

        let buttonsArray = [prev, counter, next];

        if (pages.length > 3) {
            const first = new ButtonBuilder().setCustomId('first').setLabel('FIRST').setStyle(ButtonStyle.Success);
            const last = new ButtonBuilder().setCustomId('last').setLabel('LAST').setStyle(ButtonStyle.Success);
            buttonsArray = [first, ...buttonsArray, last];
        }

        const buttons = new ActionRowBuilder().addComponents(buttonsArray);

        const msg = await message.channel.send({
            embeds: [pages[index]],
            components: [buttons],
        });

        const messageCollector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time,
        });

        messageCollector.on('collect', async (i) => {
            if (i.user.id !== message.author.id) return i.reply({ content: 'You cannot click on this embed.', ephemeral: true });

            await i.deferUpdate();

            if (i.customId === 'prev') {
                if (index > 0) index--;
            } else if (i.customId === 'next') {
                if (index < pages.length - 1) index++;
            } else if (i.customId === 'first') {
                index = 0;
            } else if (i.customId === 'last') {
                index = pages.length - 1;
            }

            counter.setLabel(`${index + 1}/${pages.length}`);

            prev.setDisabled(index === 0);
            next.setDisabled(index === pages.length - 1);

            if (pages.length > 3) {
                buttonsArray[0].setDisabled(index === 0);
                buttonsArray[buttonsArray.length - 1].setDisabled(index === pages.length - 1);
            }

            await msg.edit({
                embeds: [pages[index]],
                components: [buttons],
            });

            messageCollector.resetTimer();
        });

        messageCollector.on('end', async () => {
            prev.setDisabled(true);
            next.setDisabled(true);

            await msg.edit({
                embeds: [pages[index]],
                components: [buttons],
            });
        });

        return msg;
    } catch (error) {
        console.error(error);
    }
};