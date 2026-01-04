/**
 *  Copyright (c) 2025 taskylizard. Apache License 2.0.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import type { Theme } from '../types'

export const monochromeTheme: Theme = {
  name: 'monochrome',
  displayName: 'Monochrome',
  modes: {
    light: {
      bg: '#ffffff',
      bgAlt: '#f5f5f5',
      bgElv: 'rgba(255, 255, 255, 0.8)',
      button: {
        brand: {
          bg: '#000000',
          border: '#000000',
          text: '#ffffff',
          hoverBorder: '#333333',
          hoverText: '#ffffff',
          hoverBg: '#333333',
          activeBorder: '#000000',
          activeText: '#ffffff',
          activeBg: '#000000'
        },
        alt: {
          bg: '#e5e5e5',
          text: '#000000',
          hoverBg: '#d4d4d4',
          hoverText: '#000000'
        }
      },
      customBlock: {
        info: {
          bg: '#f5f5f5',
          border: '#737373',
          text: '#404040',
          textDeep: '#262626'
        },
        tip: {
          bg: '#f5f5f5',
          border: '#737373',
          text: '#404040',
          textDeep: '#262626'
        },
        warning: {
          bg: '#f5f5f5',
          border: '#737373',
          text: '#404040',
          textDeep: '#262626'
        },
        danger: {
          bg: '#f5f5f5',
          border: '#737373',
          text: '#404040',
          textDeep: '#262626'
        }
      },
      selection: {
        bg: '#d4d4d4'
      }
    },
    dark: {
      brand: {
        1: '#ffffff',
        2: '#e5e5e5',
        3: '#d4d4d4',
        soft: '#a3a3a3'
      },
      bg: '#000000',
      bgAlt: '#0a0a0a',
      bgElv: 'rgba(0, 0, 0, 0.9)',
      text: {
        1: '#ffffff',
        2: '#d4d4d4',
        3: '#a3a3a3'
      },
      button: {
        brand: {
          bg: '#ffffff',
          border: '#ffffff',
          text: '#000000',
          hoverBorder: '#e5e5e5',
          hoverText: '#000000',
          hoverBg: '#e5e5e5',
          activeBorder: '#d4d4d4',
          activeText: '#000000',
          activeBg: '#d4d4d4'
        },
        alt: {
          bg: '#262626',
          text: '#ffffff',
          hoverBg: '#404040',
          hoverText: '#ffffff'
        }
      },
      customBlock: {
        info: {
          bg: '#171717',
          border: '#737373',
          text: '#d4d4d4',
          textDeep: '#e5e5e5'
        },
        tip: {
          bg: '#171717',
          border: '#737373',
          text: '#d4d4d4',
          textDeep: '#e5e5e5'
        },
        warning: {
          bg: '#171717',
          border: '#737373',
          text: '#d4d4d4',
          textDeep: '#e5e5e5'
        },
        danger: {
          bg: '#171717',
          border: '#737373',
          text: '#d4d4d4',
          textDeep: '#e5e5e5'
        }
      },
      selection: {
        bg: '#404040'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: '#ffffff',
        heroImageBackground: 'linear-gradient(-45deg, #ffffff 50%, #000000 50%)',
        heroImageFilter: 'blur(44px)'
      }
    }
  },
  customProperties: {
    '--monochrome-filter': 'grayscale(100%) contrast(1.2)'
  }
}
