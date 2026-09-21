const $BotaniaCustomPortalBuilder = Java.loadClass(
    'net.kyrptonaught.customportalapi.api.CustomPortalBuilder'
)

const $BotaniaResourceLocation = Java.loadClass(
    'net.minecraft.resources.ResourceLocation'
)

const PEACE_RADIUS = 16
const PEACE_RADIUS_SQUARED = PEACE_RADIUS * PEACE_RADIUS

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

StartupEvents.registry('mob_effect', event => {
    event.create('devil_stick_effect')
        .displayName('Stone')
        .color(0x000000)
        .harmful()
        .effectTick((player, lvl) => {
            if (player.age %10 == 0) {
                global.devilStickPropagation(player)
            }
        })

    event.create('pacified_effect')
        .displayName('Stone')
        .color(0x000000)
        .harmful()
        .effectTick((entity, lvl) => {
            entity.setTarget(null)
        })
})

global.devilStickPropagation = player => {
    const entities = player.level.getEntitiesWithin(
        AABB.of(
            player.x - PEACE_RADIUS,
            player.y - PEACE_RADIUS,
            player.z - PEACE_RADIUS,
            player.x + PEACE_RADIUS,
            player.y + PEACE_RADIUS,
            player.z + PEACE_RADIUS
        )
    )

    for (const entity of entities) {

        if (entity.isLiving()) {
            const dx = entity.x - player.x
            const dy = entity.y - player.y
            const dz = entity.z - player.z

            const distanceSquared =
                dx * dx +
                dy * dy +
                dz * dz

            if (distanceSquared < PEACE_RADIUS_SQUARED && !entity.hasEffect('kubejs:devil_stick_effect')) {
                entity.potionEffects.add( 'kubejs:pacified_effect', 30, 0 )
            }
        }
    }
}

StartupEvents.registry('block', event => {
    event.create('life_essence_block')
        .displayName('Gaia Spirit Block')
        .hardness(5.0)
        .resistance(6.0)
        .requiresTool(true)
        .model('kubejs:block/life_essence_block')
        .tagBlock('minecraft:mineable/pickaxe') //can be mined faster with an axe
        .soundType('amethyst')

    event.create('life_essence_block_oc')
        .displayName('Overcharged Gaia Spirit Block')
        .hardness(5.0)
        .resistance(6.0)
        .requiresTool(true)
        .model('kubejs:block/life_essence_block_oc')
        .tagBlock('minecraft:mineable/pickaxe') //can be mined faster with an axe
        .soundType('amethyst')
})

StartupEvents.registry('item', event => {
    event.create('devil_stick')
    .displayName('Bâton du Diable')
    .maxStackSize(16)
    .texture('kubejs:item/devil_stick')
    .useAnimation('drink')
    .useDuration(itemstack => 40)
    .use((level, player, hand) => true)
    .finishUsing((itemstack, level, entity) => {
        const effects = entity.potionEffects
        effects.add('kubejs:devil_stick_effect', 90 * 20)
        itemstack.shrink(1)
        return itemstack
    })
    .releaseUsing((itemstack, level, entity, tick) => {
        const effects = entity.potionEffects
        effects.add('kubejs:devil_stick_effect', 3 * 20)
    })
})