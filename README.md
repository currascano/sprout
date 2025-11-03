# SPROUT — Smart Plant Research Optimization Unity Tool

Monorepo scaffold including:
- `app/` Expo (web + iOS + Android) with **MIA** orb demo
- `api/` NestJS API skeleton
- `packages/ui/` shared UI with **MIAOrb** (web+native)
- `docs/` VitePress docs starter
- GitHub Actions CI + Pages deploy (Expo web export)
- Community & licensing

## Quick Start
```bash
npm i
npm run bootstrap

# Run the web demo
npm run web

# Run native
npm run ios   # or: npm run android
```


## STT Setup

**Web**: Uses the built-in Web Speech API (Chrome/Edge).  
**iOS/Android**: Install native STT.

```bash
cd app
npm i react-native-voice
npx pod-install
```

Then ensure iOS `Info.plist` includes:
- `NSSpeechRecognitionUsageDescription`
- `NSMicrophoneUsageDescription`


## Always-listening mode (“Hey MIA”)

- Web uses **Web Speech API** in continuous mode. Chrome/Edge recommended.
- iOS/Android uses **react-native-voice**. Add permissions in Info.plist/Android Manifest.
- The toggle lives in the demo screen and can be disabled anytime.
- Wake phrases: “hey mia”, “ok mia”. Edit in `app/src/mia/wakeword.ts`.

