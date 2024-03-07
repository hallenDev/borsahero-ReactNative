import percentage from '~/utils/percentage'

/**
 * Height 785,.. -> fontSize = 11
 * Height 1000 -> fontSize = 14
 * Height 1285,.. -> fontSize = 18
 * @returns
 */
// const baseFontSize = Math.floor(Dimensions.get('window').height * 0.014)

export const text = {
  regular: {
    fontFamily: 'DMSans-Regular',
  },
  semiBold: {
    fontFamily: 'DMSans-SemiBold',
  },
  bold: {
    fontFamily: 'DMSans-Bold',
  },
  medium: {
    fontFamily: 'DMSans-Medium',
  },
  boldItalic: {
    fontFamily: 'DMSans-BoldItalic',
  },
}

export const label = {
  REQUEST_TO_FRIEND: 'Add to Friends',
}

const COLOR = {
  BORDER_PRIMARY: '#FFFFFF1A',
  SURFACE_PRIMARY: '#141414',
  SURFACE_SEONDARY: '#FFFFFF0F',

  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#FFFFFF64',
  TEXT_ACCENT: '#946EFF',

  BUTTON_PRIMARY: '#6E3AFF',
  //
  PRIMARY: '#FEBF2F',
  PRIMARY_SHADE: '#F4AB00',
  SECONDARY: '#FFFFFF',

  TEXT: '#1D1F2B',
  TEXT_SUB: '#6F7495',
  BACKGROUND: '#141414',
  BACKGROUND2: '#141414',

  BORDER: '#DEE2F0',
  INPUT_BACKGROUND: '#F2F4FC',
  WHITE: '#FFFFFF',

  TAB_BORDER_COLOR: '#222222',
}

export const colors = {
  border_primary: '#FFFFFF1A',
  border_destructive: '#FF3535',

  surface_primary: '#141414',
  surface_secondary: '#FFFFFF0F',

  shadow_hover: '#28282D48',

  destructive_red: '#FF3535',

  textMain: '#FFFFFF',
  text_primary: '#FFFFFF',
  text_secondary: '#FFFFFF64',
  text_accent: '#946EFF',
  text_success: '#85FF3A',

  button_primary: '#6E3AFF',

  white: '#FFFFFF',

  bgGradient: ['#141414', '#141414'],

  alert: '#FF0000',
  tabBorderColor: COLOR.TAB_BORDER_COLOR,
}

export const typography = {
  h1: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 32,
    lineHeight: percentage(32, 120),
    color: colors.text,
  },
  h2: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 24,
    lineHeight: percentage(24, 120),
    color: colors.text,
  },
  h3: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: percentage(20, 120),
    color: colors.text,
  },
  h4: {
    fontFamily: text.regular.fontFamily,
    fontSize: 20,
    lineHeight: percentage(20, 120),
    color: colors.text,
  },
  h5: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  //Paragraphs
  p1b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 16,
    lineHeight: percentage(16, 150),
    color: colors.text,
  },
  p2b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 14,
    lineHeight: percentage(14, 140),
    color: colors.text,
  },
  p3b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 12,
    lineHeight: percentage(12, 140),
    color: colors.text,
  },
  p1: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    lineHeight: percentage(16, 150),
    color: colors.text,
  },
  p2: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.text,
  },
  p3: {
    fontFamily: text.regular.fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: percentage(12, 140),
    color: colors.text,
  },
  //Captions
  c1: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 10,
    lineHeight: percentage(10, 120),
    color: colors.text,
  },
  c2: {
    fontFamily: text.regular.fontFamily,
    fontSize: 10,
    lineHeight: percentage(10, 120),
    color: colors.text,
  },
  // errorParams: {
  //   fontFamily: text.semiBold.fontFamily,
  //   fontSize: 86,
  //   color: colors.semiGray,
  // },
}
