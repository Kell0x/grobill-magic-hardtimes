ServerEvents.recipes(event => {

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:manipulation_essence', 'kubejs:nether_scroll', 'kubejs:end_scroll', 'kubejs:overworld_scroll', 'kubejs:au_dela_scroll', 'kubejs:noosphere_scroll', 'kubejs:deep_noosphere_scroll', 'kubejs:overworld11_scroll'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:adelm_scroll', // output
        1000
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:conjuration_essence', 'ars_nouveau:earth_essence'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:overworld_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:conjuration_essence', 'ars_nouveau:fire_essence'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:nether_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:conjuration_essence', 'ars_nouveau:air_essence'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:end_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:conjuration_essence', 'ars_nouveau:water_essence'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:noosphere_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:manipulation_essence', 'kubejs:noosphere_scroll'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:deep_noosphere_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:manipulation_essence', 'kubejs:nether_scroll'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:au_dela_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:manipulation_essence', 'kubejs:end_scroll'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:au_dela_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:manipulation_essence', 'kubejs:overworld_scroll'], // input items
        'ars_nouveau:stable_warp_scroll', // reagent
        'kubejs:overworld11_scroll', // output
        1000 // source cost
        // true // keep nbt of reagent, think like a smithing recipe
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"minecraft:overworld",z:0}}'),
        ['kubejs:overworld_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"minecraft:the_nether",z:0}}'),
        ['kubejs:nether_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"minecraft:the_end",z:0}}'),
        ['kubejs:end_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"oneironaut:noosphere",z:0}}'),
        ['kubejs:noosphere_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"oneironaut:deep_noosphere",z:0}}'),
        ['kubejs:deep_noosphere_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"au_dela:au_dela",z:0}}'),
        ['kubejs:au_dela_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"minecraft:overworld11",z:0}}'),
        ['kubejs:overworld11_scroll', 'ars_nouveau:stable_warp_scroll']
    )

    event.shapeless(
        Item.of('ars_nouveau:stable_warp_scroll', '{an_warp_scroll:{yRot:0.0f,x:0,xRot:0.0f,y:0,dim:"adelm:adelm",z:0}}'),
        ['kubejs:adelm_scroll', 'ars_nouveau:stable_warp_scroll']
    )
})