function getBannedPlayers(server) {
    const bans = server.playerList.getBans()
    const names = bans.getUserList()

    return Array.from(names)
}

ServerEvents.commandRegistry(event => {

    const { commands: Commands, arguments: Arguments } = event

    event.register(
        Commands.literal('phylactery')
            .then(
                Commands.argument(
                    'target',
                    Arguments.STRING.create(event)
                )
                .executes(ctx => {

                    const player = ctx.source.player

                    if (!player) {
                        return 0
                    }

                    const target = Arguments.STRING.getResult(ctx, 'target')

                    const bannedPlayers = getBannedPlayers(player.server)

                    if (!bannedPlayers.includes(target)) {
                        player.tell('§cCette âme ne figure plus dans le registre.')
                        return 0
                    }

                    const phylactery = Item.of(
                        'minecraft:player_head',
                        {
                            SkullOwner: target,
                            Phylactery: 1,
                            SoulName: target
                        }
                    )

                    phylactery.setHoverName(
                        Text.of(`Phylactère de ${target}`)
                            .lightPurple()
                    )

                    player.give(phylactery)

                    player.tell(
                        `§5Le phylactère de §d${target} §5se matérialise entre vos mains.`
                    )

                    return 1
                })
            )
    )
})


BlockEvents.rightClicked('kubejs:soul_registry', event => {

    if (event.hand == 'OFF_HAND') return

    const player = event.player
    const server = event.server

    const bannedPlayers = getBannedPlayers(server)

    player.tell('§8§m================================')
    player.tell('§5§l        REGISTRE DES ÂMES')
    player.tell('§8§m================================')

    if (bannedPlayers.length === 0) {
        player.tell('§7Aucune âme ne réclame actuellement votre aide.')
        return
    }

    for (let i = 0; i < bannedPlayers.length; i++) {

        let deadPlayer = bannedPlayers[i]

        const line = Text.of(`☠ ${deadPlayer} - `)
            .gray()
            .append(
                Text.of('Phylactère')
                    .lightPurple()
                    .underlined()
                    .clickRunCommand(`/phylactery ${deadPlayer}`)
                    .hover(`§dMatérialiser le phylactère de ${deadPlayer}`)
            )

        player.tell(line)
    }

    player.tell('§8§m================================')
})

BlockEvents.rightClicked('kubejs:resurrection_altar', event => {

    if (event.hand == 'OFF_HAND') return

    const player = event.player
    const item = event.item

    // Il faut tenir une tête de joueur
    if (item.id !== 'minecraft:player_head') {
        player.tell('§7L’autel ne réagit pas.')
        return
    }

    // Il faut que ce soit un vrai phylactère
    if (!item.nbt) {
        player.tell('§cCette tête ne contient aucune âme.')
        return
    }

    if (!item.nbt.Phylactery) {
        player.tell('§cCette tête n’est pas un phylactère.')
        return
    }

    const soulName = item.nbt.SoulName

    if (!soulName) {
        player.tell('§cLe phylactère est corrompu.')
        return
    }

    console.log(`[Resurrection] Tentative de résurrection de ${soulName}`)

    // Pardonne le joueur
    player.server.runCommandSilent(`pardon ${soulName}`)

    // Consomme une seule tête
    item.count--

    player.tell(
        `§5L’âme de §d${soulName} §5a été rappelée.`
    )

    console.log(`[Resurrection] ${soulName} a été pardonné`)
})