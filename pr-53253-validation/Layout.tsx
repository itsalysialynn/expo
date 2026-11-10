import { Text, VStack } from '@expo/ui/swift-ui';
import { activityBackgroundTint, background, font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers';
import { createLiveActivity } from 'expo-widgets';

export const tintActivity = createLiveActivity('BackgroundTintValidation', (props: { label: string; tint: any }) => {
  'widget';
  const modifiers = [padding({ all: 20 }), background('#FFFFFF')];
  if (props.tint !== null) modifiers.push(activityBackgroundTint(props.tint));
  const banner = (
    <VStack alignment="leading" spacing={10} modifiers={modifiers}>
      <Text modifiers={[font({ textStyle: 'headline' }), foregroundStyle('#111111')]}>
        Live Activity color check
      </Text>
      <Text modifiers={[font({ textStyle: 'body' }), foregroundStyle('#111111')]}>
        {props.label}
      </Text>
    </VStack>
  );
  return {
    banner,
    compactLeading: <Text>Color</Text>,
    compactTrailing: <Text>Check</Text>,
    minimal: <Text>C</Text>,
    expandedBottom: banner,
  };
});
