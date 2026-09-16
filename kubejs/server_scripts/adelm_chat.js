PlayerEvents.chat(event => {
    let message = String(event.message).trim()

    event.player.persistentData.putString(
        'adelm_last_chat_message',
        message
    )
})
