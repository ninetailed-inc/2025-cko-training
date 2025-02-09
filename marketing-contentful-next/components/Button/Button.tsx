import React from 'react';

import { handleErrors } from '@/lib/helperfunctions';
import Link from 'next/link';

import type { TypeButtonWithoutUnresolvableLinksResponse } from '@/types/TypeButton';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'small' | 'large';
export type ButtonVariant =
  TypeButtonWithoutUnresolvableLinksResponse['fields']['variant'];

const variantMap = {
  primary: 'bg-indigo-600 text-white',
  secondary: 'bg-indigo-100 text-indigo-700',
  loud: 'bg-amber-600 text-white',
};

const sizeMap = {
  small: 'py-2 px-3',
  large: 'py-3 px-6',
};

export interface ButtonProps {
  as?: React.ElementType | typeof Link;
  children: string;
  disabled?: boolean;
  eventType?: TypeButtonWithoutUnresolvableLinksResponse['fields']['eventType'];
  eventName?: TypeButtonWithoutUnresolvableLinksResponse['fields']['eventName'];
  eventPayload?: TypeButtonWithoutUnresolvableLinksResponse['fields']['eventPayload'];
  href?: string;
  size: ButtonSize;
  type: ButtonType;
  variant: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref) => {
    const {
      as: Component = 'button',
      size: size = 'large',
      children,
      eventType,
      eventName,
      eventPayload,
      disabled,
      href,
      variant,
      type,
    } = props;

    return (
      <>
        <Component
          href={href}
          type={type}
          ref={ref}
          className="block bg-gray-900 disabled:opacity-80"
          disabled={disabled}
        >
          <div
            className={`${variantMap[variant]} ${sizeMap[size]} flex justify-center border-gray-900 border-2 duration-150 -translate-x-1 -translate-y-1 active:translate-x-0 active:translate-y-0 hover:-translate-x-1.5 hover:-translate-y-1.5`}
          >
            {children}
          </div>
        </Component>
      </>
    );
  }
);

Button.defaultProps = {
  as: Link,
};

Button.displayName = 'Button';
