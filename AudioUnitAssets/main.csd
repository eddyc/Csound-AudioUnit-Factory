<CsoundSynthesizer>
<CsOptions>
 -M0 -odac
</CsOptions>
<CsInstruments>
nchnls = 2
0dbfs = 1
ksmps = 64
sr = 44100

massign  1, 1

instr 1

iCps cpsmidi
iAmp ampmidi 0dbfs * 0.3
iAttack chnget "Attack"
iRelease chnget "Release"
kCutoff chnget "Cutoff"

aOut vco2 iAmp, iCps
;aADSR madsr iAttack, 0.001, 1, iRelease
;aOut = aOut * aADSR
;aOut lpf18 aOut, kCutoff * 5000 + 3000, 0.5, 0.5

outs aOut, aOut
endin

</CsInstruments>
<CsScore>
e36000
</CsScore>
</CsoundSynthesizer>
