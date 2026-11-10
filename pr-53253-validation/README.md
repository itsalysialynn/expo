# Expo Widgets PR 53253 validation

These are full, unmodified iOS Simulator screenshots from `apps/bare-expo`.
They are stored on this fork-only branch and are not part of the upstream PR diff.

- Device: iPhone 17 Pro simulator, iOS 26.5.
- Before: base commit `62faa9f7003d860e00e59dee0ec899e38f4e6daf`, without the proposed native patch.
- After: PR commit `9bbe4ac64863d7694a3a0d40343f47b1b38bd3c3`, with the submitted native patch.
- The before image was captured before installing the after build.
- A third build forwarding only `Color.convert(from:)` gave the same visible result.

## Result

Both before and after show the requested gold tint on the system permission section.
The proposed fix does not establish an improvement for this reproduction. The PR remains a draft.
This test does not demonstrate that the patch is required, and does not prove that iOS permission material can be made fully opaque.

## Reproduce

1. In `apps/bare-expo`, add the existing workspace dependency `expo-widgets` and its config plugin with `widgets: []` and `enablePushNotifications: false`.
2. Copy the accompanying `App.tsx` and `Layout.tsx` into a temporary local fixture directory. Register `App` in the bare-expo entry point.
3. Run iOS prebuild, install pods, and build the app against the base commit on a fresh simulator.
4. Run Metro and open the fixture. Start the `Opaque gold #E69F00` case.
5. Open Notification Center without answering the Live Activity permission prompt. Capture the before image.
6. Compile and install the PR version of `WidgetLiveActivity.swift` on the same simulator. Reload the same fixture and repeat the same case for the after image.

The layout gives its content a white background and applies `activityBackgroundTint` separately.
There are no Qi colors, app assets, native modifiers, or onboarding dependencies.

Additional baseline checks used no tint and a DynamicColorIOS value. Both rendered successfully before the patch.
The extra named-color, RGBA, clear, and high-contrast buttons are reproduction options, not claims that every case has been tested.
