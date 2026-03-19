interface Messages {
	menuItemMap: string
	menuItemAbout: string
	menuToggleButtonAria: string
	mapPopupDate: string
	mapPopupType: string
	mapPopupDead: string
	mapPopupInjured: string
	mapPopupLocation: string
	mapPopupPlace: string
	aboutMainTitle: string
	aboutMainText: string
	aboutSectionTitle1: string
	aboutSectionText1: string
	aboutContactsTitle: string
	aboutContactsText: string
	filterLabelFrom: string
	filterLabelTo: string
	filterLabelType: string
	filterLabelDeath: string
	filterIndicatorLoading: string
	filterPlaceholder: string
}

export default {
	en: {
		menuItemMap: 'Map',
		menuItemAbout: 'About',
		menuToggleButtonAria: "Open menu",
		mapPopupDate: 'Date',
		mapPopupType: 'Type',
		mapPopupDead: 'Dead',
		mapPopupInjured: 'Injured',
		mapPopupLocation: 'Location',
		mapPopupPlace: 'Place',
		aboutMainTitle: "Title",
		aboutMainText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis earum cupiditate repellat tempora, enim explicabo magni id dicta quo tenetur illo, reprehenderit dignissimos ut, doloribus totam similique et nisi ea!",
		aboutSectionTitle1: "Title small",
		aboutSectionText1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis earum cupiditate repellat tempora, enim explicabo magni id dicta quo tenetur illo, reprehenderit dignissimos ut, doloribus totam similique et nisi ea!",
		aboutContactsTitle: "Contacts",
		aboutContactsText: "You can contact us via:",
		filterLabelFrom: 'From',
		filterLabelTo: 'To',
		filterLabelType: 'Type',
		filterLabelDeath: 'With deaths only',
		filterIndicatorLoading: 'Loading…',
		filterPlaceholder: 'e.g. collision',
	},
	hy: {
		menuItemMap: 'Քառտեզ',
		menuItemAbout: 'Մեր մասին',
		menuToggleButtonAria: "Բացել ընտրացանկը",
		mapPopupDate: 'Ամսաթիվ',
		mapPopupType: 'Տեսակ',
		mapPopupDead: 'Զոհ',
		mapPopupInjured: 'Վիրավոր',
		mapPopupLocation: 'Վայր',
		mapPopupPlace: 'Վայր (ճշգրիտ)',
		aboutMainTitle: "Վերնագիր",
		aboutMainText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis earum cupiditate repellat tempora, enim explicabo magni id dicta quo tenetur illo, reprehenderit dignissimos ut, doloribus totam similique et nisi ea!",
		aboutSectionTitle1: "Վերնագիր փոքր",
		aboutSectionText1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis earum cupiditate repellat tempora, enim explicabo magni id dicta quo tenetur illo, reprehenderit dignissimos ut, doloribus totam similique et nisi ea!",
		aboutContactsTitle: "Կապ",
		aboutContactsText: "Դուք կարող եք կապ հաստատել մեզ հետ հետևյալ միջոցներով.",
		filterLabelFrom: 'Սկսած',
		filterLabelTo: 'Մինչև',
		filterLabelType: 'Տեսակ',
		filterLabelDeath: 'Միայն մահվան ելքով',
		filterIndicatorLoading: 'Բեռնվում է…',
		filterPlaceholder: "օրինակ՝ բախում",
	},
} satisfies Record<string, Messages>
