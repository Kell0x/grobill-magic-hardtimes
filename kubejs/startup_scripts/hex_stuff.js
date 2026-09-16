let $ActionRegistryEntry = Java.loadClass('at.petrak.hexcasting.api.casting.ActionRegistryEntry')
let $HexPattern = Java.loadClass('at.petrak.hexcasting.api.casting.math.HexPattern')
let $HexDir = Java.loadClass('at.petrak.hexcasting.api.casting.math.HexDir')
let $OperationResult = Java.loadClass('at.petrak.hexcasting.api.casting.eval.OperationResult')
let $Mishap = Java.loadClass('at.petrak.hexcasting.api.casting.mishaps.Mishap')
let $OperatorSideEffect = Java.loadClass('at.petrak.hexcasting.api.casting.eval.sideeffects.OperatorSideEffect')
let $HexEvalSounds = Java.loadClass('at.petrak.hexcasting.common.lib.hex.HexEvalSounds')
let $NullIota = Java.loadClass('at.petrak.hexcasting.api.casting.iota.NullIota')
let $MishapNotEnoughArgs = Java.loadClass('at.petrak.hexcasting.api.casting.mishaps.MishapNotEnoughArgs')
let $MishapBadEntity = Java.loadClass('at.petrak.hexcasting.api.casting.mishaps.MishapBadEntity')
let $CastingVM = Java.loadClass('at.petrak.hexcasting.api.casting.eval.vm.CastingVM')
let $MishapOthersName = Java.loadClass('at.petrak.hexcasting.api.casting.mishaps.MishapOthersName')
let $EntityIota = Java.loadClass('at.petrak.hexcasting.api.casting.iota.EntityIota')
let $IotaType = Java.loadClass('at.petrak.hexcasting.api.casting.iota.IotaType')

let $HexAPI = Java.loadClass('at.petrak.hexcasting.api.HexAPI')

let $SoundEvent = Java.loadClass('net.minecraft.sounds.SoundEvent')
let $EvalSound = Java.loadClass('at.petrak.hexcasting.api.casting.eval.sideeffects.EvalSound')

let $DimIota = Java.loadClass('org.arcticquests.dev.oneironaut.oneironautt.casting.iotatypes.DimIota')
let $MishapInvalidIota = Java.loadClass('at.petrak.hexcasting.api.casting.mishaps.MishapInvalidIota')

let $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

let squishCastSoundEvent = $SoundEvent.createVariableRangeEvent('appendhextome:casting.cast.squish')
let squishCastEvalSound = new $EvalSound(squishCastSoundEvent, 1500)
let squishFailSoundEvent = $SoundEvent.createVariableRangeEvent('appendhextome:casting.cast.fail')
let squishMishapEvalSound = new $EvalSound(squishFailSoundEvent, 4500)


StartupEvents.registry('hexcasting:action', event => {

    function registerPattern(seq, dir, id, options) {

        let pattern = $HexPattern.fromAngles(seq, dir)
        event.createCustom(id, () => { return new $ActionRegistryEntry(pattern, new hexAction(id, pattern, options)) })
    }

    registerPattern('qaqwed', $HexDir.NORTH_EAST, 'adelm:chat_to_imprint', { sound: squishCastEvalSound, mishapSound: squishMishapEvalSound })
    registerPattern('qeewwwweeqdwwwddadedadaawwaeawwadaeawwwaeqeawwwaeeaeqqwwwwqqe', $HexDir.NORTH_EAST, 'adelm:dim_teleport', { sound: squishCastEvalSound, mishapSound: squishMishapEvalSound })
})

let $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
let DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type")

function collectArgs(stack, n, keep) {
    if (stack.length < n) throw $MishapNotEnoughArgs(n, stack.length)
    return stack[keep ? 'slice' : 'splice'](-n)
}

let patternMap = {
    'adelm:chat_to_imprint': (stack, ctx) => {
        let caster = ctx.castingEntity

        if (!caster || !caster.isPlayer()) {
            throw $MishapBadEntity(caster, 'iota.player')
        }

        let message = caster.persistentData
            .getString('adelm_last_chat_message')
            .trim()

        // Aucun message mémorisé
        if (!message) {
            console.log('Aucun message enregistré pour ' + caster.getName().getString())
            return []
        }

        // Vérifie d'abord que la syntaxe namespace:path est valide.
        let dimensionId = $ResourceLocation.tryParse(message)

        if (dimensionId == null) {
            console.log(
                'Identifiant de dimension invalide pour ' +
                caster.getName().getString() +
                ': ' + message
            )

            return []
        }

        // Le constructeur String est directement supporté par DimIota.
        let imprint = new $DimIota(message)

        // Vérifie ensuite que la dimension existe réellement sur ce serveur.
        let destination = imprint.toWorld(caster.server)

        if (destination == null) {
            console.log(
                'Dimension inconnue pour ' +
                caster.getName().getString() +
                ': ' + message
            )

            return []
        }

        stack.push(imprint)

        return []
    },
    'adelm:dim_teleport': (stack, ctx) => {

    let args = collectArgs(stack, 2)

    let entityIota = args[0]
    let imprintIota = args[1]

    let caster = ctx.castingEntity

    // Le sort doit être lancé par un joueur
    if (!caster || !caster.isPlayer()) {
        throw $MishapBadEntity(caster, 'iota.player')
    }

    // Premier argument : Entity
    if (!(entityIota instanceof $EntityIota)) {
        throw $MishapInvalidIota.ofType(
            entityIota,
            1,
            'hexcasting:iota.entity'
        )
    }

    let target = entityIota.getEntity()

    // Il est interdit de téléporter quelqu'un d'autre
    if (target !== caster) {
        throw $MishapBadEntity(target, 'iota.player')
    }

    // Deuxième argument : Spatial Imprint de Oneironaut
    if (!(imprintIota instanceof $DimIota)) {
        throw $MishapInvalidIota.ofType(
            imprintIota,
            0,
            'oneironaut:imprint'
        )
    }

    // Résolution de l'imprint vers le ServerWorld cible
    let server = caster.server
    let destination = imprintIota.toWorld(server)

    if (destination == null) {
        throw $MishapInvalidIota.ofType(
            imprintIota,
            0,
            'oneironaut:imprint'
        )
    }

    // On mémorise les coordonnées au moment du cast
    let x = caster.getX()
    let y = caster.getY()
    let z = caster.getZ()

    let yaw = caster.getYaw()
    let pitch = caster.getPitch()
    
    console.log("Destination: " + destination)
    console.log("Coords: " + x + " " + y + " " + z)
    
    let dimensionId = destination.getDimension()
    console.log("Dimension ID: " + dimensionId)

    return [
        $OperatorSideEffect.AttemptSpell(
            {
                cast: () => {
                    console.log("Teleport cast exécuté")
                
                    if (String(dimensionId) === "adelm:adelm") {
                        caster.teleportTo(dimensionId, 0, 0, 0, yaw, pitch)
                        caster.runCommandSilent(
                            'advancement grant @s only adelm:adelm_hex'
                        )
                    } else {
                        caster.teleportTo(dimensionId, x, y, z, yaw, pitch)
                    }
                }
            },
            true,
            true
        )
    ]
}
}


function hexAction(id, pattern, options) {
    const { sound, mishapSound } = options || {}
    this.operate = (env, img, cont) => {
        let stack = img.stack
        if (stack.toArray) stack = Array.from(stack.toArray())
        try {
            let sideEffects = patternMap[id](stack, env, img) || []
            let newImg = img.copy(stack, img.parenCount, img.parenthesized, img.escapeNext, img.opsConsumed + 1, img.userData)
            return $OperationResult(newImg, sideEffects, cont, sound || $HexEvalSounds.NORMAL_EXECUTE)
        } catch (e) {
            if (e instanceof $Mishap) {
                let mishapName = Text.translate(`hexcasting.action.${id}`).aqua()
                let mishapEffect = $OperatorSideEffect.DoMishap(e, $Mishap.Context(pattern, mishapName))
                mishapEffect.performEffect($CastingVM(img, env))
                let newImg = img.copy(stack, img.parenCount, img.parenthesized, img.escapeNext, 0, img.userData)
                while (cont.next) cont = cont.next
                return $OperationResult(newImg, [mishapEffect], cont, mishapSound || $HexEvalSounds.MISHAP)
            }
            throw e
        }
    }
}
