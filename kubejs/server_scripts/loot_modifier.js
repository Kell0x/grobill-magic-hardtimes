LootJS.modifiers((event) => {
  event
    .addLootTableModifier(/^minecraft:chests\/.*/)
    .removeLoot('kubejs:pov_interplanaire')
    .removeLoot('kubejs:bloodied_wedding_ring')
    .removeLoot('kubejs:adelm_scroll')
    .removeLoot('kubejs:overworld_scroll')
    .removeLoot('kubejs:nether_scroll')
    .removeLoot('kubejs:end_scroll')
    .removeLoot('kubejs:noosphere_scroll')
    .removeLoot('kubejs:deep_noosphere_scroll')
    .removeLoot('kubejs:au_dela_scroll')
    .removeLoot('kubejs:overworld11_scroll')
    .removeLoot('kubejs:life_essence_block_oc')
    .removeLoot('kubejs:life_essence_block')
    .removeLoot('kubejs:soul_registry')
    .removeLoot('kubejs:resurrection_altar')
    .removeLoot('kubejs:portoloin')
});

ServerEvents.tags('item', event => {
  event.remove('irons_spellbooks:lootable_focus', 'kubejs:pov_interplanaire')
})
