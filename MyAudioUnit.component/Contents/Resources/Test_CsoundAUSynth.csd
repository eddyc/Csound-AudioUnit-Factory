<CsoundSynthesizer>
<CsOptions>
-+rtmidi=null -+rtaudio=null -M0 -odac
</CsOptions>
<CsInstruments>
nchnls = 2
0dbfs = 1
ksmps = 64
sr = 44100

massign 1, "Synth"

instr Synth

iCps    cpsmidi
iAmp    ampmidi   0dbfs * 0.3
iAttack chnget "Attack"
iRelease chnget "Release"

aOut vco2 iAmp, iCps
aADSR madsr iAttack, 0, 1, iRelease
aOut = aOut * aADSR

outs      aOut, aOut
endin

</CsInstruments>
</CsoundSynthesizer>
