StartupEvents.registry('block', event => {

    event.create('soul_registry')
        .displayName('Registre des Âmes')
        .woodSoundType()
        .unbreakable()
        .opaque(false)
        .fullBlock(false)

    event.create('resurrection_altar')
        .displayName('Autel de Résurrection')
        .stoneSoundType()
        .unbreakable()
        .opaque(false)
        .fullBlock(false)

})