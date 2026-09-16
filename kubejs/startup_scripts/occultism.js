StartupEvents.registry('item', event => {
    event.create('bloodied_wedding_ring')
        .displayName('Bloodied Wedding Ring')
        .tooltip('What have you done...')
        .rarity('epic')
        .maxStackSize(1)
        .texture('kubejs:item/bloodied_wedding_ring')
        .glow(true)
})