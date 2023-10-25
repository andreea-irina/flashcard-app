import * as React from 'react';
import {Icon, IconProps} from '@ui-kitten/components';

export const AddIcon = (props: IconProps) => <Icon {...props} name="plus" />;

export const OpenIcon = (props: IconProps) => (
  <Icon {...props} name="chevron-right" />
);

export const BackIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-back" />
);

export const DeleteIcon = (props: IconProps) => (
  <Icon {...props} name="trash-2-outline" />
);

export const LogOutIcon = (props: IconProps) => (
  <Icon {...props} name="log-out" />
);

export const PrevIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-left-outline" />
);

export const NextIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-right-outline" />
);

export const FlipIcon = (props: IconProps) => <Icon {...props} name="flip-2" />;
