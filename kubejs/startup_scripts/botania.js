const $BotaniaCustomPortalBuilder = Java.loadClass(
    'net.kyrptonaught.customportalapi.api.CustomPortalBuilder'
)

const $BotaniaResourceLocation = Java.loadClass(
    'net.minecraft.resources.ResourceLocation'
)

StartupEvents.postInit(event => {

    const builder = $BotaniaCustomPortalBuilder.beginPortal()

    builder[
        'frameBlock(net.minecraft.resources.ResourceLocation)'
    ](
        new $BotaniaResourceLocation('kubejs:life_essence_block_oc')
    )

    builder.destDimID(
        new $BotaniaResourceLocation('adelm:adelm')
    )

    builder.registerPostTPEvent(entity => {

        // On ne s'intéresse qu'aux joueurs
        if (!entity || !entity.isPlayer()) {
            return
        }

        const player = entity

        // Sécurité supplémentaire :
        // on vérifie que le joueur se trouve bien dans l'ADELM
        const dimension = String(
            player.level.dimension
        )

        if (dimension !== 'adelm:adelm') {
            return
        }

        console.log(
            `[ADELM] ${player.username} est arrivé dans l'ADELM via le portail Botania`
        )

        player.runCommandSilent(
            'advancement grant @s only adelm:adelm_bot'
        )
    })

    builder
        .tintColor(120, 255, 180)
        .registerPortal()
})

StartupEvents.registry('block', event => {
    event.create('life_essence_block')
        .displayName('Gaia Spirit Block')
        .hardness(5.0)
        .resistance(6.0)
        .requiresTool(true)
        .model('kubejs:block/life_essence_block')
        .tagBlock('minecraft:mineable/axe') //can be mined faster with an axe
        .soundType('amethyst')

    event.create('life_essence_block_oc')
        .displayName('Overcharged Gaia Spirit Block')
        .hardness(5.0)
        .resistance(6.0)
        .requiresTool(true)
        .model('kubejs:block/life_essence_block_oc')
        .tagBlock('minecraft:mineable/axe') //can be mined faster with an axe
        .soundType('amethyst')
})