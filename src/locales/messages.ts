interface Messages {
  menuItemAbout: string
  mapFilterFrom: string
  mapFilterTo: string
  mapFilterType: string
  mapLoading: string
  mapPopupDate: string
  mapPopupType: string
  mapPopupDead: string
  mapPopupInjured: string
  mapPopupLocation: string
}

export default {
  en: {
    menuItemAbout: 'About',
    mapFilterFrom: 'From',
    mapFilterTo: 'To',
    mapFilterType: 'Type',
    mapLoading: 'Loading…',
    mapPopupDate: 'Date',
    mapPopupType: 'Type',
    mapPopupDead: 'Dead',
    mapPopupInjured: 'Injured',
    mapPopupLocation: 'Location',
  },
  hy: {
    menuItemAbout: 'Մեր մասին',
    mapFilterFrom: 'Սկիզբ',
    mapFilterTo: 'Վերջ',
    mapFilterType: 'Տեսակ',
    mapLoading: 'Բեռնվում է…',
    mapPopupDate: 'Ամսաթիվ',
    mapPopupType: 'Տեսակ',
    mapPopupDead: 'Զոհ',
    mapPopupInjured: 'Վիրավոր',
    mapPopupLocation: 'Վայր',
  },
} satisfies Record<string, Messages>
