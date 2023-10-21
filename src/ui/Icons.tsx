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
