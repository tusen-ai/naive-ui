<template>
  <div>
    <n-input
      v-model="pattern"
      placeholder="Search Icons"
    />
    <div class="icons">
      <icon-wrapper
        v-for="name in filteredNames"
        :key="name"
        :name="name"
      >
        <n-icon>
          <component :is="name" />
        </n-icon>
      </icon-wrapper>
    </div>
  </div>
</template>

<script>
import iosAddCircleOutline from 'naive-ui/lib/icons/ios-add-circle-outline'
import iosAddCircle from 'naive-ui/lib/icons/ios-add-circle'
import iosAdd from 'naive-ui/lib/icons/ios-add'
import iosAirplane from 'naive-ui/lib/icons/ios-airplane'
import iosAlarm from 'naive-ui/lib/icons/ios-alarm'
import iosAlbums from 'naive-ui/lib/icons/ios-albums'
import iosAlert from 'naive-ui/lib/icons/ios-alert'
import iosAmericanFootball from 'naive-ui/lib/icons/ios-american-football'
import iosAnalytics from 'naive-ui/lib/icons/ios-analytics'
import iosAperture from 'naive-ui/lib/icons/ios-aperture'
import iosApps from 'naive-ui/lib/icons/ios-apps'
import iosAppstore from 'naive-ui/lib/icons/ios-appstore'
import iosArchive from 'naive-ui/lib/icons/ios-archive'
import iosArrowBack from 'naive-ui/lib/icons/ios-arrow-back'
import iosArrowDown from 'naive-ui/lib/icons/ios-arrow-down'
import iosArrowDropdownCircle from 'naive-ui/lib/icons/ios-arrow-dropdown-circle'
import iosArrowDropdown from 'naive-ui/lib/icons/ios-arrow-dropdown'
import iosArrowDropleftCircle from 'naive-ui/lib/icons/ios-arrow-dropleft-circle'
import iosArrowDropleft from 'naive-ui/lib/icons/ios-arrow-dropleft'
import iosArrowDroprightCircle from 'naive-ui/lib/icons/ios-arrow-dropright-circle'
import iosArrowDropright from 'naive-ui/lib/icons/ios-arrow-dropright'
import iosArrowDropupCircle from 'naive-ui/lib/icons/ios-arrow-dropup-circle'
import iosArrowDropup from 'naive-ui/lib/icons/ios-arrow-dropup'
import iosArrowForward from 'naive-ui/lib/icons/ios-arrow-forward'
import iosArrowRoundBack from 'naive-ui/lib/icons/ios-arrow-round-back'
import iosArrowRoundDown from 'naive-ui/lib/icons/ios-arrow-round-down'
import iosArrowRoundForward from 'naive-ui/lib/icons/ios-arrow-round-forward'
import iosArrowRoundUp from 'naive-ui/lib/icons/ios-arrow-round-up'
import iosArrowUp from 'naive-ui/lib/icons/ios-arrow-up'
import iosAt from 'naive-ui/lib/icons/ios-at'
import iosAttach from 'naive-ui/lib/icons/ios-attach'
import iosBackspace from 'naive-ui/lib/icons/ios-backspace'
import iosBarcode from 'naive-ui/lib/icons/ios-barcode'
import iosBaseball from 'naive-ui/lib/icons/ios-baseball'
import iosBasket from 'naive-ui/lib/icons/ios-basket'
import iosBasketball from 'naive-ui/lib/icons/ios-basketball'
import iosBatteryCharging from 'naive-ui/lib/icons/ios-battery-charging'
import iosBatteryDead from 'naive-ui/lib/icons/ios-battery-dead'
import iosBatteryFull from 'naive-ui/lib/icons/ios-battery-full'
import iosBeaker from 'naive-ui/lib/icons/ios-beaker'
import iosBed from 'naive-ui/lib/icons/ios-bed'
import iosBeer from 'naive-ui/lib/icons/ios-beer'
import iosBicycle from 'naive-ui/lib/icons/ios-bicycle'
import iosBluetooth from 'naive-ui/lib/icons/ios-bluetooth'
import iosBoat from 'naive-ui/lib/icons/ios-boat'
import iosBody from 'naive-ui/lib/icons/ios-body'
import iosBonfire from 'naive-ui/lib/icons/ios-bonfire'
import iosBook from 'naive-ui/lib/icons/ios-book'
import iosBookmark from 'naive-ui/lib/icons/ios-bookmark'
import iosBookmarks from 'naive-ui/lib/icons/ios-bookmarks'
import iosBowtie from 'naive-ui/lib/icons/ios-bowtie'
import iosBriefcase from 'naive-ui/lib/icons/ios-briefcase'
import iosBrowsers from 'naive-ui/lib/icons/ios-browsers'
import iosBrush from 'naive-ui/lib/icons/ios-brush'
import iosBug from 'naive-ui/lib/icons/ios-bug'
import iosBuild from 'naive-ui/lib/icons/ios-build'
import iosBulb from 'naive-ui/lib/icons/ios-bulb'
import iosBus from 'naive-ui/lib/icons/ios-bus'
import iosBusiness from 'naive-ui/lib/icons/ios-business'
import iosCafe from 'naive-ui/lib/icons/ios-cafe'
import iosCalculator from 'naive-ui/lib/icons/ios-calculator'
import iosCalendar from 'naive-ui/lib/icons/ios-calendar'
import iosCall from 'naive-ui/lib/icons/ios-call'
import iosCamera from 'naive-ui/lib/icons/ios-camera'
import iosCar from 'naive-ui/lib/icons/ios-car'
import iosCard from 'naive-ui/lib/icons/ios-card'
import iosCart from 'naive-ui/lib/icons/ios-cart'
import iosCash from 'naive-ui/lib/icons/ios-cash'
import iosCellular from 'naive-ui/lib/icons/ios-cellular'
import iosChatboxes from 'naive-ui/lib/icons/ios-chatboxes'
import iosChatbubbles from 'naive-ui/lib/icons/ios-chatbubbles'
import iosCheckboxOutline from 'naive-ui/lib/icons/ios-checkbox-outline'
import iosCheckbox from 'naive-ui/lib/icons/ios-checkbox'
import iosCheckmarkCircleOutline from 'naive-ui/lib/icons/ios-checkmark-circle-outline'
import iosCheckmarkCircle from 'naive-ui/lib/icons/ios-checkmark-circle'
import iosCheckmark from 'naive-ui/lib/icons/ios-checkmark'
import iosClipboard from 'naive-ui/lib/icons/ios-clipboard'
import iosClock from 'naive-ui/lib/icons/ios-clock'
import iosCloseCircleOutline from 'naive-ui/lib/icons/ios-close-circle-outline'
import iosCloseCircle from 'naive-ui/lib/icons/ios-close-circle'
import iosClose from 'naive-ui/lib/icons/ios-close'
import iosCloudCircle from 'naive-ui/lib/icons/ios-cloud-circle'
import iosCloudDone from 'naive-ui/lib/icons/ios-cloud-done'
import iosCloudDownload from 'naive-ui/lib/icons/ios-cloud-download'
import iosCloudOutline from 'naive-ui/lib/icons/ios-cloud-outline'
import iosCloudUpload from 'naive-ui/lib/icons/ios-cloud-upload'
import iosCloud from 'naive-ui/lib/icons/ios-cloud'
import iosCloudyNight from 'naive-ui/lib/icons/ios-cloudy-night'
import iosCloudy from 'naive-ui/lib/icons/ios-cloudy'
import iosCodeDownload from 'naive-ui/lib/icons/ios-code-download'
import iosCodeWorking from 'naive-ui/lib/icons/ios-code-working'
import iosCode from 'naive-ui/lib/icons/ios-code'
import iosCog from 'naive-ui/lib/icons/ios-cog'
import iosColorFill from 'naive-ui/lib/icons/ios-color-fill'
import iosColorFilter from 'naive-ui/lib/icons/ios-color-filter'
import iosColorPalette from 'naive-ui/lib/icons/ios-color-palette'
import iosColorWand from 'naive-ui/lib/icons/ios-color-wand'
import iosCompass from 'naive-ui/lib/icons/ios-compass'
import iosConstruct from 'naive-ui/lib/icons/ios-construct'
import iosContact from 'naive-ui/lib/icons/ios-contact'
import iosContacts from 'naive-ui/lib/icons/ios-contacts'
import iosContract from 'naive-ui/lib/icons/ios-contract'
import iosContrast from 'naive-ui/lib/icons/ios-contrast'
import iosCopy from 'naive-ui/lib/icons/ios-copy'
import iosCreate from 'naive-ui/lib/icons/ios-create'
import iosCrop from 'naive-ui/lib/icons/ios-crop'
import iosCube from 'naive-ui/lib/icons/ios-cube'
import iosCut from 'naive-ui/lib/icons/ios-cut'
import iosDesktop from 'naive-ui/lib/icons/ios-desktop'
import iosDisc from 'naive-ui/lib/icons/ios-disc'
import iosDocument from 'naive-ui/lib/icons/ios-document'
import iosDoneAll from 'naive-ui/lib/icons/ios-done-all'
import iosDownload from 'naive-ui/lib/icons/ios-download'
import iosEasel from 'naive-ui/lib/icons/ios-easel'
import iosEgg from 'naive-ui/lib/icons/ios-egg'
import iosExit from 'naive-ui/lib/icons/ios-exit'
import iosExpand from 'naive-ui/lib/icons/ios-expand'
import iosEyeOff from 'naive-ui/lib/icons/ios-eye-off'
import iosEye from 'naive-ui/lib/icons/ios-eye'
import iosFastforward from 'naive-ui/lib/icons/ios-fastforward'
import iosFemale from 'naive-ui/lib/icons/ios-female'
import iosFiling from 'naive-ui/lib/icons/ios-filing'
import iosFilm from 'naive-ui/lib/icons/ios-film'
import iosFingerPrint from 'naive-ui/lib/icons/ios-finger-print'
import iosFitness from 'naive-ui/lib/icons/ios-fitness'
import iosFlag from 'naive-ui/lib/icons/ios-flag'
import iosFlame from 'naive-ui/lib/icons/ios-flame'
import iosFlashOff from 'naive-ui/lib/icons/ios-flash-off'
import iosFlash from 'naive-ui/lib/icons/ios-flash'
import iosFlashlight from 'naive-ui/lib/icons/ios-flashlight'
import iosFlask from 'naive-ui/lib/icons/ios-flask'
import iosFlower from 'naive-ui/lib/icons/ios-flower'
import iosFolderOpen from 'naive-ui/lib/icons/ios-folder-open'
import iosFolder from 'naive-ui/lib/icons/ios-folder'
import iosFootball from 'naive-ui/lib/icons/ios-football'
import iosFunnel from 'naive-ui/lib/icons/ios-funnel'
import iosGift from 'naive-ui/lib/icons/ios-gift'
import iosGitBranch from 'naive-ui/lib/icons/ios-git-branch'
import iosGitCommit from 'naive-ui/lib/icons/ios-git-commit'
import iosGitCompare from 'naive-ui/lib/icons/ios-git-compare'
import iosGitMerge from 'naive-ui/lib/icons/ios-git-merge'
import iosGitNetwork from 'naive-ui/lib/icons/ios-git-network'
import iosGitPullRequest from 'naive-ui/lib/icons/ios-git-pull-request'
import iosGlasses from 'naive-ui/lib/icons/ios-glasses'
import iosGlobe from 'naive-ui/lib/icons/ios-globe'
import iosGrid from 'naive-ui/lib/icons/ios-grid'
import iosHammer from 'naive-ui/lib/icons/ios-hammer'
import iosHand from 'naive-ui/lib/icons/ios-hand'
import iosHappy from 'naive-ui/lib/icons/ios-happy'
import iosHeadset from 'naive-ui/lib/icons/ios-headset'
import iosHeartDislike from 'naive-ui/lib/icons/ios-heart-dislike'
import iosHeartEmpty from 'naive-ui/lib/icons/ios-heart-empty'
import iosHeartHalf from 'naive-ui/lib/icons/ios-heart-half'
import iosHeart from 'naive-ui/lib/icons/ios-heart'
import iosHelpBuoy from 'naive-ui/lib/icons/ios-help-buoy'
import iosHelpCircleOutline from 'naive-ui/lib/icons/ios-help-circle-outline'
import iosHelpCircle from 'naive-ui/lib/icons/ios-help-circle'
import iosHelp from 'naive-ui/lib/icons/ios-help'
import iosHome from 'naive-ui/lib/icons/ios-home'
import iosHourglass from 'naive-ui/lib/icons/ios-hourglass'
import iosIceCream from 'naive-ui/lib/icons/ios-ice-cream'
import iosImage from 'naive-ui/lib/icons/ios-image'
import iosImages from 'naive-ui/lib/icons/ios-images'
import iosInfinite from 'naive-ui/lib/icons/ios-infinite'
import iosInformationCircleOutline from 'naive-ui/lib/icons/ios-information-circle-outline'
import iosInformationCircle from 'naive-ui/lib/icons/ios-information-circle'
import iosInformation from 'naive-ui/lib/icons/ios-information'
import iosJet from 'naive-ui/lib/icons/ios-jet'
import iosJournal from 'naive-ui/lib/icons/ios-journal'
import iosKey from 'naive-ui/lib/icons/ios-key'
import iosKeypad from 'naive-ui/lib/icons/ios-keypad'
import iosLaptop from 'naive-ui/lib/icons/ios-laptop'
import iosLeaf from 'naive-ui/lib/icons/ios-leaf'
import iosLink from 'naive-ui/lib/icons/ios-link'
import iosListBox from 'naive-ui/lib/icons/ios-list-box'
import iosList from 'naive-ui/lib/icons/ios-list'
import iosLocate from 'naive-ui/lib/icons/ios-locate'
import iosLock from 'naive-ui/lib/icons/ios-lock'
import iosLogIn from 'naive-ui/lib/icons/ios-log-in'
import iosLogOut from 'naive-ui/lib/icons/ios-log-out'
import iosMagnet from 'naive-ui/lib/icons/ios-magnet'
import iosMailOpen from 'naive-ui/lib/icons/ios-mail-open'
import iosMailUnread from 'naive-ui/lib/icons/ios-mail-unread'
import iosMail from 'naive-ui/lib/icons/ios-mail'
import iosMale from 'naive-ui/lib/icons/ios-male'
import iosMan from 'naive-ui/lib/icons/ios-man'
import iosMap from 'naive-ui/lib/icons/ios-map'
import iosMedal from 'naive-ui/lib/icons/ios-medal'
import iosMedical from 'naive-ui/lib/icons/ios-medical'
import iosMedkit from 'naive-ui/lib/icons/ios-medkit'
import iosMegaphone from 'naive-ui/lib/icons/ios-megaphone'
import iosMenu from 'naive-ui/lib/icons/ios-menu'
import iosMicOff from 'naive-ui/lib/icons/ios-mic-off'
import iosMic from 'naive-ui/lib/icons/ios-mic'
import iosMicrophone from 'naive-ui/lib/icons/ios-microphone'
import iosMoon from 'naive-ui/lib/icons/ios-moon'
import iosMore from 'naive-ui/lib/icons/ios-more'
import iosMove from 'naive-ui/lib/icons/ios-move'
import iosMusicalNote from 'naive-ui/lib/icons/ios-musical-note'
import iosMusicalNotes from 'naive-ui/lib/icons/ios-musical-notes'
import iosNavigate from 'naive-ui/lib/icons/ios-navigate'
import iosNotificationsOff from 'naive-ui/lib/icons/ios-notifications-off'
import iosNotificationsOutline from 'naive-ui/lib/icons/ios-notifications-outline'
import iosNotifications from 'naive-ui/lib/icons/ios-notifications'
import iosNuclear from 'naive-ui/lib/icons/ios-nuclear'
import iosNutrition from 'naive-ui/lib/icons/ios-nutrition'
import iosOpen from 'naive-ui/lib/icons/ios-open'
import iosOptions from 'naive-ui/lib/icons/ios-options'
import iosOutlet from 'naive-ui/lib/icons/ios-outlet'
import iosPaperPlane from 'naive-ui/lib/icons/ios-paper-plane'
import iosPaper from 'naive-ui/lib/icons/ios-paper'
import iosPartlySunny from 'naive-ui/lib/icons/ios-partly-sunny'
import iosPause from 'naive-ui/lib/icons/ios-pause'
import iosPaw from 'naive-ui/lib/icons/ios-paw'
import iosPeople from 'naive-ui/lib/icons/ios-people'
import iosPersonAdd from 'naive-ui/lib/icons/ios-person-add'
import iosPerson from 'naive-ui/lib/icons/ios-person'
import iosPhoneLandscape from 'naive-ui/lib/icons/ios-phone-landscape'
import iosPhonePortrait from 'naive-ui/lib/icons/ios-phone-portrait'
import iosPhotos from 'naive-ui/lib/icons/ios-photos'
import iosPie from 'naive-ui/lib/icons/ios-pie'
import iosPin from 'naive-ui/lib/icons/ios-pin'
import iosPint from 'naive-ui/lib/icons/ios-pint'
import iosPizza from 'naive-ui/lib/icons/ios-pizza'
import iosPlanet from 'naive-ui/lib/icons/ios-planet'
import iosPlayCircle from 'naive-ui/lib/icons/ios-play-circle'
import iosPlay from 'naive-ui/lib/icons/ios-play'
import iosPodium from 'naive-ui/lib/icons/ios-podium'
import iosPower from 'naive-ui/lib/icons/ios-power'
import iosPricetag from 'naive-ui/lib/icons/ios-pricetag'
import iosPricetags from 'naive-ui/lib/icons/ios-pricetags'
import iosPrint from 'naive-ui/lib/icons/ios-print'
import iosPulse from 'naive-ui/lib/icons/ios-pulse'
import iosQrScanner from 'naive-ui/lib/icons/ios-qr-scanner'
import iosQuote from 'naive-ui/lib/icons/ios-quote'
import iosRadioButtonOff from 'naive-ui/lib/icons/ios-radio-button-off'
import iosRadioButtonOn from 'naive-ui/lib/icons/ios-radio-button-on'
import iosRadio from 'naive-ui/lib/icons/ios-radio'
import iosRainy from 'naive-ui/lib/icons/ios-rainy'
import iosRecording from 'naive-ui/lib/icons/ios-recording'
import iosRedo from 'naive-ui/lib/icons/ios-redo'
import iosRefreshCircle from 'naive-ui/lib/icons/ios-refresh-circle'
import iosRefresh from 'naive-ui/lib/icons/ios-refresh'
import iosRemoveCircleOutline from 'naive-ui/lib/icons/ios-remove-circle-outline'
import iosRemoveCircle from 'naive-ui/lib/icons/ios-remove-circle'
import iosRemove from 'naive-ui/lib/icons/ios-remove'
import iosReorder from 'naive-ui/lib/icons/ios-reorder'
import iosRepeat from 'naive-ui/lib/icons/ios-repeat'
import iosResize from 'naive-ui/lib/icons/ios-resize'
import iosRestaurant from 'naive-ui/lib/icons/ios-restaurant'
import iosReturnLeft from 'naive-ui/lib/icons/ios-return-left'
import iosReturnRight from 'naive-ui/lib/icons/ios-return-right'
import iosReverseCamera from 'naive-ui/lib/icons/ios-reverse-camera'
import iosRewind from 'naive-ui/lib/icons/ios-rewind'
import iosRibbon from 'naive-ui/lib/icons/ios-ribbon'
import iosRocket from 'naive-ui/lib/icons/ios-rocket'
import iosRose from 'naive-ui/lib/icons/ios-rose'
import iosSad from 'naive-ui/lib/icons/ios-sad'
import iosSave from 'naive-ui/lib/icons/ios-save'
import iosSchool from 'naive-ui/lib/icons/ios-school'
import iosSearch from 'naive-ui/lib/icons/ios-search'
import iosSend from 'naive-ui/lib/icons/ios-send'
import iosSettings from 'naive-ui/lib/icons/ios-settings'
import iosShareAlt from 'naive-ui/lib/icons/ios-share-alt'
import iosShare from 'naive-ui/lib/icons/ios-share'
import iosShirt from 'naive-ui/lib/icons/ios-shirt'
import iosShuffle from 'naive-ui/lib/icons/ios-shuffle'
import iosSkipBackward from 'naive-ui/lib/icons/ios-skip-backward'
import iosSkipForward from 'naive-ui/lib/icons/ios-skip-forward'
import iosSnow from 'naive-ui/lib/icons/ios-snow'
import iosSpeedometer from 'naive-ui/lib/icons/ios-speedometer'
import iosSquareOutline from 'naive-ui/lib/icons/ios-square-outline'
import iosSquare from 'naive-ui/lib/icons/ios-square'
import iosStarHalf from 'naive-ui/lib/icons/ios-star-half'
import iosStarOutline from 'naive-ui/lib/icons/ios-star-outline'
import iosStar from 'naive-ui/lib/icons/ios-star'
import iosStats from 'naive-ui/lib/icons/ios-stats'
import iosStopwatch from 'naive-ui/lib/icons/ios-stopwatch'
import iosSubway from 'naive-ui/lib/icons/ios-subway'
import iosSunny from 'naive-ui/lib/icons/ios-sunny'
import iosSwap from 'naive-ui/lib/icons/ios-swap'
import iosSwitch from 'naive-ui/lib/icons/ios-switch'
import iosSync from 'naive-ui/lib/icons/ios-sync'
import iosTabletLandscape from 'naive-ui/lib/icons/ios-tablet-landscape'
import iosTabletPortrait from 'naive-ui/lib/icons/ios-tablet-portrait'
import iosTennisball from 'naive-ui/lib/icons/ios-tennisball'
import iosText from 'naive-ui/lib/icons/ios-text'
import iosThermometer from 'naive-ui/lib/icons/ios-thermometer'
import iosThumbsDown from 'naive-ui/lib/icons/ios-thumbs-down'
import iosThumbsUp from 'naive-ui/lib/icons/ios-thumbs-up'
import iosThunderstorm from 'naive-ui/lib/icons/ios-thunderstorm'
import iosTime from 'naive-ui/lib/icons/ios-time'
import iosTimer from 'naive-ui/lib/icons/ios-timer'
import iosToday from 'naive-ui/lib/icons/ios-today'
import iosTrain from 'naive-ui/lib/icons/ios-train'
import iosTransgender from 'naive-ui/lib/icons/ios-transgender'
import iosTrash from 'naive-ui/lib/icons/ios-trash'
import iosTrendingDown from 'naive-ui/lib/icons/ios-trending-down'
import iosTrendingUp from 'naive-ui/lib/icons/ios-trending-up'
import iosTrophy from 'naive-ui/lib/icons/ios-trophy'
import iosTv from 'naive-ui/lib/icons/ios-tv'
import iosUmbrella from 'naive-ui/lib/icons/ios-umbrella'
import iosUndo from 'naive-ui/lib/icons/ios-undo'
import iosUnlock from 'naive-ui/lib/icons/ios-unlock'
import iosVideocam from 'naive-ui/lib/icons/ios-videocam'
import iosVolumeHigh from 'naive-ui/lib/icons/ios-volume-high'
import iosVolumeLow from 'naive-ui/lib/icons/ios-volume-low'
import iosVolumeMute from 'naive-ui/lib/icons/ios-volume-mute'
import iosVolumeOff from 'naive-ui/lib/icons/ios-volume-off'
import iosWalk from 'naive-ui/lib/icons/ios-walk'
import iosWallet from 'naive-ui/lib/icons/ios-wallet'
import iosWarning from 'naive-ui/lib/icons/ios-warning'
import iosWatch from 'naive-ui/lib/icons/ios-watch'
import iosWater from 'naive-ui/lib/icons/ios-water'
import iosWifi from 'naive-ui/lib/icons/ios-wifi'
import iosWine from 'naive-ui/lib/icons/ios-wine'
import iosWoman from 'naive-ui/lib/icons/ios-woman'
import logoAndroid from 'naive-ui/lib/icons/logo-android'
import logoAngular from 'naive-ui/lib/icons/logo-angular'
import logoApple from 'naive-ui/lib/icons/logo-apple'
import logoBitbucket from 'naive-ui/lib/icons/logo-bitbucket'
import logoBitcoin from 'naive-ui/lib/icons/logo-bitcoin'
import logoBuffer from 'naive-ui/lib/icons/logo-buffer'
import logoChrome from 'naive-ui/lib/icons/logo-chrome'
import logoClosedCaptioning from 'naive-ui/lib/icons/logo-closed-captioning'
import logoCodepen from 'naive-ui/lib/icons/logo-codepen'
import logoCss3 from 'naive-ui/lib/icons/logo-css3'
import logoDesignernews from 'naive-ui/lib/icons/logo-designernews'
import logoDribbble from 'naive-ui/lib/icons/logo-dribbble'
import logoDropbox from 'naive-ui/lib/icons/logo-dropbox'
import logoEuro from 'naive-ui/lib/icons/logo-euro'
import logoFacebook from 'naive-ui/lib/icons/logo-facebook'
import logoFlickr from 'naive-ui/lib/icons/logo-flickr'
import logoFoursquare from 'naive-ui/lib/icons/logo-foursquare'
import logoFreebsdDevil from 'naive-ui/lib/icons/logo-freebsd-devil'
import logoGameControllerA from 'naive-ui/lib/icons/logo-game-controller-a'
import logoGameControllerB from 'naive-ui/lib/icons/logo-game-controller-b'
import logoGithub from 'naive-ui/lib/icons/logo-github'
import logoGoogle from 'naive-ui/lib/icons/logo-google'
import logoGoogleplus from 'naive-ui/lib/icons/logo-googleplus'
import logoHackernews from 'naive-ui/lib/icons/logo-hackernews'
import logoHtml5 from 'naive-ui/lib/icons/logo-html5'
import logoInstagram from 'naive-ui/lib/icons/logo-instagram'
import logoIonic from 'naive-ui/lib/icons/logo-ionic'
import logoIonitron from 'naive-ui/lib/icons/logo-ionitron'
import logoJavascript from 'naive-ui/lib/icons/logo-javascript'
import logoLinkedin from 'naive-ui/lib/icons/logo-linkedin'
import logoMarkdown from 'naive-ui/lib/icons/logo-markdown'
import logoModelS from 'naive-ui/lib/icons/logo-model-s'
import logoNoSmoking from 'naive-ui/lib/icons/logo-no-smoking'
import logoNodejs from 'naive-ui/lib/icons/logo-nodejs'
import logoNpm from 'naive-ui/lib/icons/logo-npm'
import logoOctocat from 'naive-ui/lib/icons/logo-octocat'
import logoPinterest from 'naive-ui/lib/icons/logo-pinterest'
import logoPlaystation from 'naive-ui/lib/icons/logo-playstation'
import logoPolymer from 'naive-ui/lib/icons/logo-polymer'
import logoPython from 'naive-ui/lib/icons/logo-python'
import logoReddit from 'naive-ui/lib/icons/logo-reddit'
import logoRss from 'naive-ui/lib/icons/logo-rss'
import logoSass from 'naive-ui/lib/icons/logo-sass'
import logoSkype from 'naive-ui/lib/icons/logo-skype'
import logoSlack from 'naive-ui/lib/icons/logo-slack'
import logoSnapchat from 'naive-ui/lib/icons/logo-snapchat'
import logoSteam from 'naive-ui/lib/icons/logo-steam'
import logoTumblr from 'naive-ui/lib/icons/logo-tumblr'
import logoTux from 'naive-ui/lib/icons/logo-tux'
import logoTwitch from 'naive-ui/lib/icons/logo-twitch'
import logoTwitter from 'naive-ui/lib/icons/logo-twitter'
import logoUsd from 'naive-ui/lib/icons/logo-usd'
import logoVimeo from 'naive-ui/lib/icons/logo-vimeo'
import logoVk from 'naive-ui/lib/icons/logo-vk'
import logoWhatsapp from 'naive-ui/lib/icons/logo-whatsapp'
import logoWindows from 'naive-ui/lib/icons/logo-windows'
import logoWordpress from 'naive-ui/lib/icons/logo-wordpress'
import logoXbox from 'naive-ui/lib/icons/logo-xbox'
import logoXing from 'naive-ui/lib/icons/logo-xing'
import logoYahoo from 'naive-ui/lib/icons/logo-yahoo'
import logoYen from 'naive-ui/lib/icons/logo-yen'
import logoYoutube from 'naive-ui/lib/icons/logo-youtube'
import mdAddCircleOutline from 'naive-ui/lib/icons/md-add-circle-outline'
import mdAddCircle from 'naive-ui/lib/icons/md-add-circle'
import mdAdd from 'naive-ui/lib/icons/md-add'
import mdAirplane from 'naive-ui/lib/icons/md-airplane'
import mdAlarm from 'naive-ui/lib/icons/md-alarm'
import mdAlbums from 'naive-ui/lib/icons/md-albums'
import mdAlert from 'naive-ui/lib/icons/md-alert'
import mdAmericanFootball from 'naive-ui/lib/icons/md-american-football'
import mdAnalytics from 'naive-ui/lib/icons/md-analytics'
import mdAperture from 'naive-ui/lib/icons/md-aperture'
import mdApps from 'naive-ui/lib/icons/md-apps'
import mdAppstore from 'naive-ui/lib/icons/md-appstore'
import mdArchive from 'naive-ui/lib/icons/md-archive'
import mdArrowBack from 'naive-ui/lib/icons/md-arrow-back'
import mdArrowDown from 'naive-ui/lib/icons/md-arrow-down'
import mdArrowDropdownCircle from 'naive-ui/lib/icons/md-arrow-dropdown-circle'
import mdArrowDropdown from 'naive-ui/lib/icons/md-arrow-dropdown'
import mdArrowDropleftCircle from 'naive-ui/lib/icons/md-arrow-dropleft-circle'
import mdArrowDropleft from 'naive-ui/lib/icons/md-arrow-dropleft'
import mdArrowDroprightCircle from 'naive-ui/lib/icons/md-arrow-dropright-circle'
import mdArrowDropright from 'naive-ui/lib/icons/md-arrow-dropright'
import mdArrowDropupCircle from 'naive-ui/lib/icons/md-arrow-dropup-circle'
import mdArrowDropup from 'naive-ui/lib/icons/md-arrow-dropup'
import mdArrowForward from 'naive-ui/lib/icons/md-arrow-forward'
import mdArrowRoundBack from 'naive-ui/lib/icons/md-arrow-round-back'
import mdArrowRoundDown from 'naive-ui/lib/icons/md-arrow-round-down'
import mdArrowRoundForward from 'naive-ui/lib/icons/md-arrow-round-forward'
import mdArrowRoundUp from 'naive-ui/lib/icons/md-arrow-round-up'
import mdArrowUp from 'naive-ui/lib/icons/md-arrow-up'
import mdAt from 'naive-ui/lib/icons/md-at'
import mdAttach from 'naive-ui/lib/icons/md-attach'
import mdBackspace from 'naive-ui/lib/icons/md-backspace'
import mdBarcode from 'naive-ui/lib/icons/md-barcode'
import mdBaseball from 'naive-ui/lib/icons/md-baseball'
import mdBasket from 'naive-ui/lib/icons/md-basket'
import mdBasketball from 'naive-ui/lib/icons/md-basketball'
import mdBatteryCharging from 'naive-ui/lib/icons/md-battery-charging'
import mdBatteryDead from 'naive-ui/lib/icons/md-battery-dead'
import mdBatteryFull from 'naive-ui/lib/icons/md-battery-full'
import mdBeaker from 'naive-ui/lib/icons/md-beaker'
import mdBed from 'naive-ui/lib/icons/md-bed'
import mdBeer from 'naive-ui/lib/icons/md-beer'
import mdBicycle from 'naive-ui/lib/icons/md-bicycle'
import mdBluetooth from 'naive-ui/lib/icons/md-bluetooth'
import mdBoat from 'naive-ui/lib/icons/md-boat'
import mdBody from 'naive-ui/lib/icons/md-body'
import mdBonfire from 'naive-ui/lib/icons/md-bonfire'
import mdBook from 'naive-ui/lib/icons/md-book'
import mdBookmark from 'naive-ui/lib/icons/md-bookmark'
import mdBookmarks from 'naive-ui/lib/icons/md-bookmarks'
import mdBowtie from 'naive-ui/lib/icons/md-bowtie'
import mdBriefcase from 'naive-ui/lib/icons/md-briefcase'
import mdBrowsers from 'naive-ui/lib/icons/md-browsers'
import mdBrush from 'naive-ui/lib/icons/md-brush'
import mdBug from 'naive-ui/lib/icons/md-bug'
import mdBuild from 'naive-ui/lib/icons/md-build'
import mdBulb from 'naive-ui/lib/icons/md-bulb'
import mdBus from 'naive-ui/lib/icons/md-bus'
import mdBusiness from 'naive-ui/lib/icons/md-business'
import mdCafe from 'naive-ui/lib/icons/md-cafe'
import mdCalculator from 'naive-ui/lib/icons/md-calculator'
import mdCalendar from 'naive-ui/lib/icons/md-calendar'
import mdCall from 'naive-ui/lib/icons/md-call'
import mdCamera from 'naive-ui/lib/icons/md-camera'
import mdCar from 'naive-ui/lib/icons/md-car'
import mdCard from 'naive-ui/lib/icons/md-card'
import mdCart from 'naive-ui/lib/icons/md-cart'
import mdCash from 'naive-ui/lib/icons/md-cash'
import mdCellular from 'naive-ui/lib/icons/md-cellular'
import mdChatboxes from 'naive-ui/lib/icons/md-chatboxes'
import mdChatbubbles from 'naive-ui/lib/icons/md-chatbubbles'
import mdCheckboxOutline from 'naive-ui/lib/icons/md-checkbox-outline'
import mdCheckbox from 'naive-ui/lib/icons/md-checkbox'
import mdCheckmarkCircleOutline from 'naive-ui/lib/icons/md-checkmark-circle-outline'
import mdCheckmarkCircle from 'naive-ui/lib/icons/md-checkmark-circle'
import mdCheckmark from 'naive-ui/lib/icons/md-checkmark'
import mdClipboard from 'naive-ui/lib/icons/md-clipboard'
import mdClock from 'naive-ui/lib/icons/md-clock'
import mdCloseCircleOutline from 'naive-ui/lib/icons/md-close-circle-outline'
import mdCloseCircle from 'naive-ui/lib/icons/md-close-circle'
import mdClose from 'naive-ui/lib/icons/md-close'
import mdCloudCircle from 'naive-ui/lib/icons/md-cloud-circle'
import mdCloudDone from 'naive-ui/lib/icons/md-cloud-done'
import mdCloudDownload from 'naive-ui/lib/icons/md-cloud-download'
import mdCloudOutline from 'naive-ui/lib/icons/md-cloud-outline'
import mdCloudUpload from 'naive-ui/lib/icons/md-cloud-upload'
import mdCloud from 'naive-ui/lib/icons/md-cloud'
import mdCloudyNight from 'naive-ui/lib/icons/md-cloudy-night'
import mdCloudy from 'naive-ui/lib/icons/md-cloudy'
import mdCodeDownload from 'naive-ui/lib/icons/md-code-download'
import mdCodeWorking from 'naive-ui/lib/icons/md-code-working'
import mdCode from 'naive-ui/lib/icons/md-code'
import mdCog from 'naive-ui/lib/icons/md-cog'
import mdColorFill from 'naive-ui/lib/icons/md-color-fill'
import mdColorFilter from 'naive-ui/lib/icons/md-color-filter'
import mdColorPalette from 'naive-ui/lib/icons/md-color-palette'
import mdColorWand from 'naive-ui/lib/icons/md-color-wand'
import mdCompass from 'naive-ui/lib/icons/md-compass'
import mdConstruct from 'naive-ui/lib/icons/md-construct'
import mdContact from 'naive-ui/lib/icons/md-contact'
import mdContacts from 'naive-ui/lib/icons/md-contacts'
import mdContract from 'naive-ui/lib/icons/md-contract'
import mdContrast from 'naive-ui/lib/icons/md-contrast'
import mdCopy from 'naive-ui/lib/icons/md-copy'
import mdCreate from 'naive-ui/lib/icons/md-create'
import mdCrop from 'naive-ui/lib/icons/md-crop'
import mdCube from 'naive-ui/lib/icons/md-cube'
import mdCut from 'naive-ui/lib/icons/md-cut'
import mdDesktop from 'naive-ui/lib/icons/md-desktop'
import mdDisc from 'naive-ui/lib/icons/md-disc'
import mdDocument from 'naive-ui/lib/icons/md-document'
import mdDoneAll from 'naive-ui/lib/icons/md-done-all'
import mdDownload from 'naive-ui/lib/icons/md-download'
import mdEasel from 'naive-ui/lib/icons/md-easel'
import mdEgg from 'naive-ui/lib/icons/md-egg'
import mdExit from 'naive-ui/lib/icons/md-exit'
import mdExpand from 'naive-ui/lib/icons/md-expand'
import mdEyeOff from 'naive-ui/lib/icons/md-eye-off'
import mdEye from 'naive-ui/lib/icons/md-eye'
import mdFastforward from 'naive-ui/lib/icons/md-fastforward'
import mdFemale from 'naive-ui/lib/icons/md-female'
import mdFiling from 'naive-ui/lib/icons/md-filing'
import mdFilm from 'naive-ui/lib/icons/md-film'
import mdFingerPrint from 'naive-ui/lib/icons/md-finger-print'
import mdFitness from 'naive-ui/lib/icons/md-fitness'
import mdFlag from 'naive-ui/lib/icons/md-flag'
import mdFlame from 'naive-ui/lib/icons/md-flame'
import mdFlashOff from 'naive-ui/lib/icons/md-flash-off'
import mdFlash from 'naive-ui/lib/icons/md-flash'
import mdFlashlight from 'naive-ui/lib/icons/md-flashlight'
import mdFlask from 'naive-ui/lib/icons/md-flask'
import mdFlower from 'naive-ui/lib/icons/md-flower'
import mdFolderOpen from 'naive-ui/lib/icons/md-folder-open'
import mdFolder from 'naive-ui/lib/icons/md-folder'
import mdFootball from 'naive-ui/lib/icons/md-football'
import mdFunnel from 'naive-ui/lib/icons/md-funnel'
import mdGift from 'naive-ui/lib/icons/md-gift'
import mdGitBranch from 'naive-ui/lib/icons/md-git-branch'
import mdGitCommit from 'naive-ui/lib/icons/md-git-commit'
import mdGitCompare from 'naive-ui/lib/icons/md-git-compare'
import mdGitMerge from 'naive-ui/lib/icons/md-git-merge'
import mdGitNetwork from 'naive-ui/lib/icons/md-git-network'
import mdGitPullRequest from 'naive-ui/lib/icons/md-git-pull-request'
import mdGlasses from 'naive-ui/lib/icons/md-glasses'
import mdGlobe from 'naive-ui/lib/icons/md-globe'
import mdGrid from 'naive-ui/lib/icons/md-grid'
import mdHammer from 'naive-ui/lib/icons/md-hammer'
import mdHand from 'naive-ui/lib/icons/md-hand'
import mdHappy from 'naive-ui/lib/icons/md-happy'
import mdHeadset from 'naive-ui/lib/icons/md-headset'
import mdHeartDislike from 'naive-ui/lib/icons/md-heart-dislike'
import mdHeartEmpty from 'naive-ui/lib/icons/md-heart-empty'
import mdHeartHalf from 'naive-ui/lib/icons/md-heart-half'
import mdHeart from 'naive-ui/lib/icons/md-heart'
import mdHelpBuoy from 'naive-ui/lib/icons/md-help-buoy'
import mdHelpCircleOutline from 'naive-ui/lib/icons/md-help-circle-outline'
import mdHelpCircle from 'naive-ui/lib/icons/md-help-circle'
import mdHelp from 'naive-ui/lib/icons/md-help'
import mdHome from 'naive-ui/lib/icons/md-home'
import mdHourglass from 'naive-ui/lib/icons/md-hourglass'
import mdIceCream from 'naive-ui/lib/icons/md-ice-cream'
import mdImage from 'naive-ui/lib/icons/md-image'
import mdImages from 'naive-ui/lib/icons/md-images'
import mdInfinite from 'naive-ui/lib/icons/md-infinite'
import mdInformationCircleOutline from 'naive-ui/lib/icons/md-information-circle-outline'
import mdInformationCircle from 'naive-ui/lib/icons/md-information-circle'
import mdInformation from 'naive-ui/lib/icons/md-information'
import mdJet from 'naive-ui/lib/icons/md-jet'
import mdJournal from 'naive-ui/lib/icons/md-journal'
import mdKey from 'naive-ui/lib/icons/md-key'
import mdKeypad from 'naive-ui/lib/icons/md-keypad'
import mdLaptop from 'naive-ui/lib/icons/md-laptop'
import mdLeaf from 'naive-ui/lib/icons/md-leaf'
import mdLink from 'naive-ui/lib/icons/md-link'
import mdListBox from 'naive-ui/lib/icons/md-list-box'
import mdList from 'naive-ui/lib/icons/md-list'
import mdLocate from 'naive-ui/lib/icons/md-locate'
import mdLock from 'naive-ui/lib/icons/md-lock'
import mdLogIn from 'naive-ui/lib/icons/md-log-in'
import mdLogOut from 'naive-ui/lib/icons/md-log-out'
import mdMagnet from 'naive-ui/lib/icons/md-magnet'
import mdMailOpen from 'naive-ui/lib/icons/md-mail-open'
import mdMailUnread from 'naive-ui/lib/icons/md-mail-unread'
import mdMail from 'naive-ui/lib/icons/md-mail'
import mdMale from 'naive-ui/lib/icons/md-male'
import mdMan from 'naive-ui/lib/icons/md-man'
import mdMap from 'naive-ui/lib/icons/md-map'
import mdMedal from 'naive-ui/lib/icons/md-medal'
import mdMedical from 'naive-ui/lib/icons/md-medical'
import mdMedkit from 'naive-ui/lib/icons/md-medkit'
import mdMegaphone from 'naive-ui/lib/icons/md-megaphone'
import mdMenu from 'naive-ui/lib/icons/md-menu'
import mdMicOff from 'naive-ui/lib/icons/md-mic-off'
import mdMic from 'naive-ui/lib/icons/md-mic'
import mdMicrophone from 'naive-ui/lib/icons/md-microphone'
import mdMoon from 'naive-ui/lib/icons/md-moon'
import mdMore from 'naive-ui/lib/icons/md-more'
import mdMove from 'naive-ui/lib/icons/md-move'
import mdMusicalNote from 'naive-ui/lib/icons/md-musical-note'
import mdMusicalNotes from 'naive-ui/lib/icons/md-musical-notes'
import mdNavigate from 'naive-ui/lib/icons/md-navigate'
import mdNotificationsOff from 'naive-ui/lib/icons/md-notifications-off'
import mdNotificationsOutline from 'naive-ui/lib/icons/md-notifications-outline'
import mdNotifications from 'naive-ui/lib/icons/md-notifications'
import mdNuclear from 'naive-ui/lib/icons/md-nuclear'
import mdNutrition from 'naive-ui/lib/icons/md-nutrition'
import mdOpen from 'naive-ui/lib/icons/md-open'
import mdOptions from 'naive-ui/lib/icons/md-options'
import mdOutlet from 'naive-ui/lib/icons/md-outlet'
import mdPaperPlane from 'naive-ui/lib/icons/md-paper-plane'
import mdPaper from 'naive-ui/lib/icons/md-paper'
import mdPartlySunny from 'naive-ui/lib/icons/md-partly-sunny'
import mdPause from 'naive-ui/lib/icons/md-pause'
import mdPaw from 'naive-ui/lib/icons/md-paw'
import mdPeople from 'naive-ui/lib/icons/md-people'
import mdPersonAdd from 'naive-ui/lib/icons/md-person-add'
import mdPerson from 'naive-ui/lib/icons/md-person'
import mdPhoneLandscape from 'naive-ui/lib/icons/md-phone-landscape'
import mdPhonePortrait from 'naive-ui/lib/icons/md-phone-portrait'
import mdPhotos from 'naive-ui/lib/icons/md-photos'
import mdPie from 'naive-ui/lib/icons/md-pie'
import mdPin from 'naive-ui/lib/icons/md-pin'
import mdPint from 'naive-ui/lib/icons/md-pint'
import mdPizza from 'naive-ui/lib/icons/md-pizza'
import mdPlanet from 'naive-ui/lib/icons/md-planet'
import mdPlayCircle from 'naive-ui/lib/icons/md-play-circle'
import mdPlay from 'naive-ui/lib/icons/md-play'
import mdPodium from 'naive-ui/lib/icons/md-podium'
import mdPower from 'naive-ui/lib/icons/md-power'
import mdPricetag from 'naive-ui/lib/icons/md-pricetag'
import mdPricetags from 'naive-ui/lib/icons/md-pricetags'
import mdPrint from 'naive-ui/lib/icons/md-print'
import mdPulse from 'naive-ui/lib/icons/md-pulse'
import mdQrScanner from 'naive-ui/lib/icons/md-qr-scanner'
import mdQuote from 'naive-ui/lib/icons/md-quote'
import mdRadioButtonOff from 'naive-ui/lib/icons/md-radio-button-off'
import mdRadioButtonOn from 'naive-ui/lib/icons/md-radio-button-on'
import mdRadio from 'naive-ui/lib/icons/md-radio'
import mdRainy from 'naive-ui/lib/icons/md-rainy'
import mdRecording from 'naive-ui/lib/icons/md-recording'
import mdRedo from 'naive-ui/lib/icons/md-redo'
import mdRefreshCircle from 'naive-ui/lib/icons/md-refresh-circle'
import mdRefresh from 'naive-ui/lib/icons/md-refresh'
import mdRemoveCircleOutline from 'naive-ui/lib/icons/md-remove-circle-outline'
import mdRemoveCircle from 'naive-ui/lib/icons/md-remove-circle'
import mdRemove from 'naive-ui/lib/icons/md-remove'
import mdReorder from 'naive-ui/lib/icons/md-reorder'
import mdRepeat from 'naive-ui/lib/icons/md-repeat'
import mdResize from 'naive-ui/lib/icons/md-resize'
import mdRestaurant from 'naive-ui/lib/icons/md-restaurant'
import mdReturnLeft from 'naive-ui/lib/icons/md-return-left'
import mdReturnRight from 'naive-ui/lib/icons/md-return-right'
import mdReverseCamera from 'naive-ui/lib/icons/md-reverse-camera'
import mdRewind from 'naive-ui/lib/icons/md-rewind'
import mdRibbon from 'naive-ui/lib/icons/md-ribbon'
import mdRocket from 'naive-ui/lib/icons/md-rocket'
import mdRose from 'naive-ui/lib/icons/md-rose'
import mdSad from 'naive-ui/lib/icons/md-sad'
import mdSave from 'naive-ui/lib/icons/md-save'
import mdSchool from 'naive-ui/lib/icons/md-school'
import mdSearch from 'naive-ui/lib/icons/md-search'
import mdSend from 'naive-ui/lib/icons/md-send'
import mdSettings from 'naive-ui/lib/icons/md-settings'
import mdShareAlt from 'naive-ui/lib/icons/md-share-alt'
import mdShare from 'naive-ui/lib/icons/md-share'
import mdShirt from 'naive-ui/lib/icons/md-shirt'
import mdShuffle from 'naive-ui/lib/icons/md-shuffle'
import mdSkipBackward from 'naive-ui/lib/icons/md-skip-backward'
import mdSkipForward from 'naive-ui/lib/icons/md-skip-forward'
import mdSnow from 'naive-ui/lib/icons/md-snow'
import mdSpeedometer from 'naive-ui/lib/icons/md-speedometer'
import mdSquareOutline from 'naive-ui/lib/icons/md-square-outline'
import mdSquare from 'naive-ui/lib/icons/md-square'
import mdStarHalf from 'naive-ui/lib/icons/md-star-half'
import mdStarOutline from 'naive-ui/lib/icons/md-star-outline'
import mdStar from 'naive-ui/lib/icons/md-star'
import mdStats from 'naive-ui/lib/icons/md-stats'
import mdStopwatch from 'naive-ui/lib/icons/md-stopwatch'
import mdSubway from 'naive-ui/lib/icons/md-subway'
import mdSunny from 'naive-ui/lib/icons/md-sunny'
import mdSwap from 'naive-ui/lib/icons/md-swap'
import mdSwitch from 'naive-ui/lib/icons/md-switch'
import mdSync from 'naive-ui/lib/icons/md-sync'
import mdTabletLandscape from 'naive-ui/lib/icons/md-tablet-landscape'
import mdTabletPortrait from 'naive-ui/lib/icons/md-tablet-portrait'
import mdTennisball from 'naive-ui/lib/icons/md-tennisball'
import mdText from 'naive-ui/lib/icons/md-text'
import mdThermometer from 'naive-ui/lib/icons/md-thermometer'
import mdThumbsDown from 'naive-ui/lib/icons/md-thumbs-down'
import mdThumbsUp from 'naive-ui/lib/icons/md-thumbs-up'
import mdThunderstorm from 'naive-ui/lib/icons/md-thunderstorm'
import mdTime from 'naive-ui/lib/icons/md-time'
import mdTimer from 'naive-ui/lib/icons/md-timer'
import mdToday from 'naive-ui/lib/icons/md-today'
import mdTrain from 'naive-ui/lib/icons/md-train'
import mdTransgender from 'naive-ui/lib/icons/md-transgender'
import mdTrash from 'naive-ui/lib/icons/md-trash'
import mdTrendingDown from 'naive-ui/lib/icons/md-trending-down'
import mdTrendingUp from 'naive-ui/lib/icons/md-trending-up'
import mdTrophy from 'naive-ui/lib/icons/md-trophy'
import mdTv from 'naive-ui/lib/icons/md-tv'
import mdUmbrella from 'naive-ui/lib/icons/md-umbrella'
import mdUndo from 'naive-ui/lib/icons/md-undo'
import mdUnlock from 'naive-ui/lib/icons/md-unlock'
import mdVideocam from 'naive-ui/lib/icons/md-videocam'
import mdVolumeHigh from 'naive-ui/lib/icons/md-volume-high'
import mdVolumeLow from 'naive-ui/lib/icons/md-volume-low'
import mdVolumeMute from 'naive-ui/lib/icons/md-volume-mute'
import mdVolumeOff from 'naive-ui/lib/icons/md-volume-off'
import mdWalk from 'naive-ui/lib/icons/md-walk'
import mdWallet from 'naive-ui/lib/icons/md-wallet'
import mdWarning from 'naive-ui/lib/icons/md-warning'
import mdWatch from 'naive-ui/lib/icons/md-watch'
import mdWater from 'naive-ui/lib/icons/md-water'
import mdWifi from 'naive-ui/lib/icons/md-wifi'
import mdWine from 'naive-ui/lib/icons/md-wine'
import mdWoman from 'naive-ui/lib/icons/md-woman'
import iconWrapper from './iconWrapper'

export default {
  components: {
    iconWrapper: iconWrapper,
    iosAddCircleOutline: iosAddCircleOutline,
    iosAddCircle: iosAddCircle,
    iosAdd: iosAdd,
    iosAirplane: iosAirplane,
    iosAlarm: iosAlarm,
    iosAlbums: iosAlbums,
    iosAlert: iosAlert,
    iosAmericanFootball: iosAmericanFootball,
    iosAnalytics: iosAnalytics,
    iosAperture: iosAperture,
    iosApps: iosApps,
    iosAppstore: iosAppstore,
    iosArchive: iosArchive,
    iosArrowBack: iosArrowBack,
    iosArrowDown: iosArrowDown,
    iosArrowDropdownCircle: iosArrowDropdownCircle,
    iosArrowDropdown: iosArrowDropdown,
    iosArrowDropleftCircle: iosArrowDropleftCircle,
    iosArrowDropleft: iosArrowDropleft,
    iosArrowDroprightCircle: iosArrowDroprightCircle,
    iosArrowDropright: iosArrowDropright,
    iosArrowDropupCircle: iosArrowDropupCircle,
    iosArrowDropup: iosArrowDropup,
    iosArrowForward: iosArrowForward,
    iosArrowRoundBack: iosArrowRoundBack,
    iosArrowRoundDown: iosArrowRoundDown,
    iosArrowRoundForward: iosArrowRoundForward,
    iosArrowRoundUp: iosArrowRoundUp,
    iosArrowUp: iosArrowUp,
    iosAt: iosAt,
    iosAttach: iosAttach,
    iosBackspace: iosBackspace,
    iosBarcode: iosBarcode,
    iosBaseball: iosBaseball,
    iosBasket: iosBasket,
    iosBasketball: iosBasketball,
    iosBatteryCharging: iosBatteryCharging,
    iosBatteryDead: iosBatteryDead,
    iosBatteryFull: iosBatteryFull,
    iosBeaker: iosBeaker,
    iosBed: iosBed,
    iosBeer: iosBeer,
    iosBicycle: iosBicycle,
    iosBluetooth: iosBluetooth,
    iosBoat: iosBoat,
    iosBody: iosBody,
    iosBonfire: iosBonfire,
    iosBook: iosBook,
    iosBookmark: iosBookmark,
    iosBookmarks: iosBookmarks,
    iosBowtie: iosBowtie,
    iosBriefcase: iosBriefcase,
    iosBrowsers: iosBrowsers,
    iosBrush: iosBrush,
    iosBug: iosBug,
    iosBuild: iosBuild,
    iosBulb: iosBulb,
    iosBus: iosBus,
    iosBusiness: iosBusiness,
    iosCafe: iosCafe,
    iosCalculator: iosCalculator,
    iosCalendar: iosCalendar,
    iosCall: iosCall,
    iosCamera: iosCamera,
    iosCar: iosCar,
    iosCard: iosCard,
    iosCart: iosCart,
    iosCash: iosCash,
    iosCellular: iosCellular,
    iosChatboxes: iosChatboxes,
    iosChatbubbles: iosChatbubbles,
    iosCheckboxOutline: iosCheckboxOutline,
    iosCheckbox: iosCheckbox,
    iosCheckmarkCircleOutline: iosCheckmarkCircleOutline,
    iosCheckmarkCircle: iosCheckmarkCircle,
    iosCheckmark: iosCheckmark,
    iosClipboard: iosClipboard,
    iosClock: iosClock,
    iosCloseCircleOutline: iosCloseCircleOutline,
    iosCloseCircle: iosCloseCircle,
    iosClose: iosClose,
    iosCloudCircle: iosCloudCircle,
    iosCloudDone: iosCloudDone,
    iosCloudDownload: iosCloudDownload,
    iosCloudOutline: iosCloudOutline,
    iosCloudUpload: iosCloudUpload,
    iosCloud: iosCloud,
    iosCloudyNight: iosCloudyNight,
    iosCloudy: iosCloudy,
    iosCodeDownload: iosCodeDownload,
    iosCodeWorking: iosCodeWorking,
    iosCode: iosCode,
    iosCog: iosCog,
    iosColorFill: iosColorFill,
    iosColorFilter: iosColorFilter,
    iosColorPalette: iosColorPalette,
    iosColorWand: iosColorWand,
    iosCompass: iosCompass,
    iosConstruct: iosConstruct,
    iosContact: iosContact,
    iosContacts: iosContacts,
    iosContract: iosContract,
    iosContrast: iosContrast,
    iosCopy: iosCopy,
    iosCreate: iosCreate,
    iosCrop: iosCrop,
    iosCube: iosCube,
    iosCut: iosCut,
    iosDesktop: iosDesktop,
    iosDisc: iosDisc,
    iosDocument: iosDocument,
    iosDoneAll: iosDoneAll,
    iosDownload: iosDownload,
    iosEasel: iosEasel,
    iosEgg: iosEgg,
    iosExit: iosExit,
    iosExpand: iosExpand,
    iosEyeOff: iosEyeOff,
    iosEye: iosEye,
    iosFastforward: iosFastforward,
    iosFemale: iosFemale,
    iosFiling: iosFiling,
    iosFilm: iosFilm,
    iosFingerPrint: iosFingerPrint,
    iosFitness: iosFitness,
    iosFlag: iosFlag,
    iosFlame: iosFlame,
    iosFlashOff: iosFlashOff,
    iosFlash: iosFlash,
    iosFlashlight: iosFlashlight,
    iosFlask: iosFlask,
    iosFlower: iosFlower,
    iosFolderOpen: iosFolderOpen,
    iosFolder: iosFolder,
    iosFootball: iosFootball,
    iosFunnel: iosFunnel,
    iosGift: iosGift,
    iosGitBranch: iosGitBranch,
    iosGitCommit: iosGitCommit,
    iosGitCompare: iosGitCompare,
    iosGitMerge: iosGitMerge,
    iosGitNetwork: iosGitNetwork,
    iosGitPullRequest: iosGitPullRequest,
    iosGlasses: iosGlasses,
    iosGlobe: iosGlobe,
    iosGrid: iosGrid,
    iosHammer: iosHammer,
    iosHand: iosHand,
    iosHappy: iosHappy,
    iosHeadset: iosHeadset,
    iosHeartDislike: iosHeartDislike,
    iosHeartEmpty: iosHeartEmpty,
    iosHeartHalf: iosHeartHalf,
    iosHeart: iosHeart,
    iosHelpBuoy: iosHelpBuoy,
    iosHelpCircleOutline: iosHelpCircleOutline,
    iosHelpCircle: iosHelpCircle,
    iosHelp: iosHelp,
    iosHome: iosHome,
    iosHourglass: iosHourglass,
    iosIceCream: iosIceCream,
    iosImage: iosImage,
    iosImages: iosImages,
    iosInfinite: iosInfinite,
    iosInformationCircleOutline: iosInformationCircleOutline,
    iosInformationCircle: iosInformationCircle,
    iosInformation: iosInformation,
    iosJet: iosJet,
    iosJournal: iosJournal,
    iosKey: iosKey,
    iosKeypad: iosKeypad,
    iosLaptop: iosLaptop,
    iosLeaf: iosLeaf,
    iosLink: iosLink,
    iosListBox: iosListBox,
    iosList: iosList,
    iosLocate: iosLocate,
    iosLock: iosLock,
    iosLogIn: iosLogIn,
    iosLogOut: iosLogOut,
    iosMagnet: iosMagnet,
    iosMailOpen: iosMailOpen,
    iosMailUnread: iosMailUnread,
    iosMail: iosMail,
    iosMale: iosMale,
    iosMan: iosMan,
    iosMap: iosMap,
    iosMedal: iosMedal,
    iosMedical: iosMedical,
    iosMedkit: iosMedkit,
    iosMegaphone: iosMegaphone,
    iosMenu: iosMenu,
    iosMicOff: iosMicOff,
    iosMic: iosMic,
    iosMicrophone: iosMicrophone,
    iosMoon: iosMoon,
    iosMore: iosMore,
    iosMove: iosMove,
    iosMusicalNote: iosMusicalNote,
    iosMusicalNotes: iosMusicalNotes,
    iosNavigate: iosNavigate,
    iosNotificationsOff: iosNotificationsOff,
    iosNotificationsOutline: iosNotificationsOutline,
    iosNotifications: iosNotifications,
    iosNuclear: iosNuclear,
    iosNutrition: iosNutrition,
    iosOpen: iosOpen,
    iosOptions: iosOptions,
    iosOutlet: iosOutlet,
    iosPaperPlane: iosPaperPlane,
    iosPaper: iosPaper,
    iosPartlySunny: iosPartlySunny,
    iosPause: iosPause,
    iosPaw: iosPaw,
    iosPeople: iosPeople,
    iosPersonAdd: iosPersonAdd,
    iosPerson: iosPerson,
    iosPhoneLandscape: iosPhoneLandscape,
    iosPhonePortrait: iosPhonePortrait,
    iosPhotos: iosPhotos,
    iosPie: iosPie,
    iosPin: iosPin,
    iosPint: iosPint,
    iosPizza: iosPizza,
    iosPlanet: iosPlanet,
    iosPlayCircle: iosPlayCircle,
    iosPlay: iosPlay,
    iosPodium: iosPodium,
    iosPower: iosPower,
    iosPricetag: iosPricetag,
    iosPricetags: iosPricetags,
    iosPrint: iosPrint,
    iosPulse: iosPulse,
    iosQrScanner: iosQrScanner,
    iosQuote: iosQuote,
    iosRadioButtonOff: iosRadioButtonOff,
    iosRadioButtonOn: iosRadioButtonOn,
    iosRadio: iosRadio,
    iosRainy: iosRainy,
    iosRecording: iosRecording,
    iosRedo: iosRedo,
    iosRefreshCircle: iosRefreshCircle,
    iosRefresh: iosRefresh,
    iosRemoveCircleOutline: iosRemoveCircleOutline,
    iosRemoveCircle: iosRemoveCircle,
    iosRemove: iosRemove,
    iosReorder: iosReorder,
    iosRepeat: iosRepeat,
    iosResize: iosResize,
    iosRestaurant: iosRestaurant,
    iosReturnLeft: iosReturnLeft,
    iosReturnRight: iosReturnRight,
    iosReverseCamera: iosReverseCamera,
    iosRewind: iosRewind,
    iosRibbon: iosRibbon,
    iosRocket: iosRocket,
    iosRose: iosRose,
    iosSad: iosSad,
    iosSave: iosSave,
    iosSchool: iosSchool,
    iosSearch: iosSearch,
    iosSend: iosSend,
    iosSettings: iosSettings,
    iosShareAlt: iosShareAlt,
    iosShare: iosShare,
    iosShirt: iosShirt,
    iosShuffle: iosShuffle,
    iosSkipBackward: iosSkipBackward,
    iosSkipForward: iosSkipForward,
    iosSnow: iosSnow,
    iosSpeedometer: iosSpeedometer,
    iosSquareOutline: iosSquareOutline,
    iosSquare: iosSquare,
    iosStarHalf: iosStarHalf,
    iosStarOutline: iosStarOutline,
    iosStar: iosStar,
    iosStats: iosStats,
    iosStopwatch: iosStopwatch,
    iosSubway: iosSubway,
    iosSunny: iosSunny,
    iosSwap: iosSwap,
    iosSwitch: iosSwitch,
    iosSync: iosSync,
    iosTabletLandscape: iosTabletLandscape,
    iosTabletPortrait: iosTabletPortrait,
    iosTennisball: iosTennisball,
    iosText: iosText,
    iosThermometer: iosThermometer,
    iosThumbsDown: iosThumbsDown,
    iosThumbsUp: iosThumbsUp,
    iosThunderstorm: iosThunderstorm,
    iosTime: iosTime,
    iosTimer: iosTimer,
    iosToday: iosToday,
    iosTrain: iosTrain,
    iosTransgender: iosTransgender,
    iosTrash: iosTrash,
    iosTrendingDown: iosTrendingDown,
    iosTrendingUp: iosTrendingUp,
    iosTrophy: iosTrophy,
    iosTv: iosTv,
    iosUmbrella: iosUmbrella,
    iosUndo: iosUndo,
    iosUnlock: iosUnlock,
    iosVideocam: iosVideocam,
    iosVolumeHigh: iosVolumeHigh,
    iosVolumeLow: iosVolumeLow,
    iosVolumeMute: iosVolumeMute,
    iosVolumeOff: iosVolumeOff,
    iosWalk: iosWalk,
    iosWallet: iosWallet,
    iosWarning: iosWarning,
    iosWatch: iosWatch,
    iosWater: iosWater,
    iosWifi: iosWifi,
    iosWine: iosWine,
    iosWoman: iosWoman,
    logoAndroid: logoAndroid,
    logoAngular: logoAngular,
    logoApple: logoApple,
    logoBitbucket: logoBitbucket,
    logoBitcoin: logoBitcoin,
    logoBuffer: logoBuffer,
    logoChrome: logoChrome,
    logoClosedCaptioning: logoClosedCaptioning,
    logoCodepen: logoCodepen,
    logoCss3: logoCss3,
    logoDesignernews: logoDesignernews,
    logoDribbble: logoDribbble,
    logoDropbox: logoDropbox,
    logoEuro: logoEuro,
    logoFacebook: logoFacebook,
    logoFlickr: logoFlickr,
    logoFoursquare: logoFoursquare,
    logoFreebsdDevil: logoFreebsdDevil,
    logoGameControllerA: logoGameControllerA,
    logoGameControllerB: logoGameControllerB,
    logoGithub: logoGithub,
    logoGoogle: logoGoogle,
    logoGoogleplus: logoGoogleplus,
    logoHackernews: logoHackernews,
    logoHtml5: logoHtml5,
    logoInstagram: logoInstagram,
    logoIonic: logoIonic,
    logoIonitron: logoIonitron,
    logoJavascript: logoJavascript,
    logoLinkedin: logoLinkedin,
    logoMarkdown: logoMarkdown,
    logoModelS: logoModelS,
    logoNoSmoking: logoNoSmoking,
    logoNodejs: logoNodejs,
    logoNpm: logoNpm,
    logoOctocat: logoOctocat,
    logoPinterest: logoPinterest,
    logoPlaystation: logoPlaystation,
    logoPolymer: logoPolymer,
    logoPython: logoPython,
    logoReddit: logoReddit,
    logoRss: logoRss,
    logoSass: logoSass,
    logoSkype: logoSkype,
    logoSlack: logoSlack,
    logoSnapchat: logoSnapchat,
    logoSteam: logoSteam,
    logoTumblr: logoTumblr,
    logoTux: logoTux,
    logoTwitch: logoTwitch,
    logoTwitter: logoTwitter,
    logoUsd: logoUsd,
    logoVimeo: logoVimeo,
    logoVk: logoVk,
    logoWhatsapp: logoWhatsapp,
    logoWindows: logoWindows,
    logoWordpress: logoWordpress,
    logoXbox: logoXbox,
    logoXing: logoXing,
    logoYahoo: logoYahoo,
    logoYen: logoYen,
    logoYoutube: logoYoutube,
    mdAddCircleOutline: mdAddCircleOutline,
    mdAddCircle: mdAddCircle,
    mdAdd: mdAdd,
    mdAirplane: mdAirplane,
    mdAlarm: mdAlarm,
    mdAlbums: mdAlbums,
    mdAlert: mdAlert,
    mdAmericanFootball: mdAmericanFootball,
    mdAnalytics: mdAnalytics,
    mdAperture: mdAperture,
    mdApps: mdApps,
    mdAppstore: mdAppstore,
    mdArchive: mdArchive,
    mdArrowBack: mdArrowBack,
    mdArrowDown: mdArrowDown,
    mdArrowDropdownCircle: mdArrowDropdownCircle,
    mdArrowDropdown: mdArrowDropdown,
    mdArrowDropleftCircle: mdArrowDropleftCircle,
    mdArrowDropleft: mdArrowDropleft,
    mdArrowDroprightCircle: mdArrowDroprightCircle,
    mdArrowDropright: mdArrowDropright,
    mdArrowDropupCircle: mdArrowDropupCircle,
    mdArrowDropup: mdArrowDropup,
    mdArrowForward: mdArrowForward,
    mdArrowRoundBack: mdArrowRoundBack,
    mdArrowRoundDown: mdArrowRoundDown,
    mdArrowRoundForward: mdArrowRoundForward,
    mdArrowRoundUp: mdArrowRoundUp,
    mdArrowUp: mdArrowUp,
    mdAt: mdAt,
    mdAttach: mdAttach,
    mdBackspace: mdBackspace,
    mdBarcode: mdBarcode,
    mdBaseball: mdBaseball,
    mdBasket: mdBasket,
    mdBasketball: mdBasketball,
    mdBatteryCharging: mdBatteryCharging,
    mdBatteryDead: mdBatteryDead,
    mdBatteryFull: mdBatteryFull,
    mdBeaker: mdBeaker,
    mdBed: mdBed,
    mdBeer: mdBeer,
    mdBicycle: mdBicycle,
    mdBluetooth: mdBluetooth,
    mdBoat: mdBoat,
    mdBody: mdBody,
    mdBonfire: mdBonfire,
    mdBook: mdBook,
    mdBookmark: mdBookmark,
    mdBookmarks: mdBookmarks,
    mdBowtie: mdBowtie,
    mdBriefcase: mdBriefcase,
    mdBrowsers: mdBrowsers,
    mdBrush: mdBrush,
    mdBug: mdBug,
    mdBuild: mdBuild,
    mdBulb: mdBulb,
    mdBus: mdBus,
    mdBusiness: mdBusiness,
    mdCafe: mdCafe,
    mdCalculator: mdCalculator,
    mdCalendar: mdCalendar,
    mdCall: mdCall,
    mdCamera: mdCamera,
    mdCar: mdCar,
    mdCard: mdCard,
    mdCart: mdCart,
    mdCash: mdCash,
    mdCellular: mdCellular,
    mdChatboxes: mdChatboxes,
    mdChatbubbles: mdChatbubbles,
    mdCheckboxOutline: mdCheckboxOutline,
    mdCheckbox: mdCheckbox,
    mdCheckmarkCircleOutline: mdCheckmarkCircleOutline,
    mdCheckmarkCircle: mdCheckmarkCircle,
    mdCheckmark: mdCheckmark,
    mdClipboard: mdClipboard,
    mdClock: mdClock,
    mdCloseCircleOutline: mdCloseCircleOutline,
    mdCloseCircle: mdCloseCircle,
    mdClose: mdClose,
    mdCloudCircle: mdCloudCircle,
    mdCloudDone: mdCloudDone,
    mdCloudDownload: mdCloudDownload,
    mdCloudOutline: mdCloudOutline,
    mdCloudUpload: mdCloudUpload,
    mdCloud: mdCloud,
    mdCloudyNight: mdCloudyNight,
    mdCloudy: mdCloudy,
    mdCodeDownload: mdCodeDownload,
    mdCodeWorking: mdCodeWorking,
    mdCode: mdCode,
    mdCog: mdCog,
    mdColorFill: mdColorFill,
    mdColorFilter: mdColorFilter,
    mdColorPalette: mdColorPalette,
    mdColorWand: mdColorWand,
    mdCompass: mdCompass,
    mdConstruct: mdConstruct,
    mdContact: mdContact,
    mdContacts: mdContacts,
    mdContract: mdContract,
    mdContrast: mdContrast,
    mdCopy: mdCopy,
    mdCreate: mdCreate,
    mdCrop: mdCrop,
    mdCube: mdCube,
    mdCut: mdCut,
    mdDesktop: mdDesktop,
    mdDisc: mdDisc,
    mdDocument: mdDocument,
    mdDoneAll: mdDoneAll,
    mdDownload: mdDownload,
    mdEasel: mdEasel,
    mdEgg: mdEgg,
    mdExit: mdExit,
    mdExpand: mdExpand,
    mdEyeOff: mdEyeOff,
    mdEye: mdEye,
    mdFastforward: mdFastforward,
    mdFemale: mdFemale,
    mdFiling: mdFiling,
    mdFilm: mdFilm,
    mdFingerPrint: mdFingerPrint,
    mdFitness: mdFitness,
    mdFlag: mdFlag,
    mdFlame: mdFlame,
    mdFlashOff: mdFlashOff,
    mdFlash: mdFlash,
    mdFlashlight: mdFlashlight,
    mdFlask: mdFlask,
    mdFlower: mdFlower,
    mdFolderOpen: mdFolderOpen,
    mdFolder: mdFolder,
    mdFootball: mdFootball,
    mdFunnel: mdFunnel,
    mdGift: mdGift,
    mdGitBranch: mdGitBranch,
    mdGitCommit: mdGitCommit,
    mdGitCompare: mdGitCompare,
    mdGitMerge: mdGitMerge,
    mdGitNetwork: mdGitNetwork,
    mdGitPullRequest: mdGitPullRequest,
    mdGlasses: mdGlasses,
    mdGlobe: mdGlobe,
    mdGrid: mdGrid,
    mdHammer: mdHammer,
    mdHand: mdHand,
    mdHappy: mdHappy,
    mdHeadset: mdHeadset,
    mdHeartDislike: mdHeartDislike,
    mdHeartEmpty: mdHeartEmpty,
    mdHeartHalf: mdHeartHalf,
    mdHeart: mdHeart,
    mdHelpBuoy: mdHelpBuoy,
    mdHelpCircleOutline: mdHelpCircleOutline,
    mdHelpCircle: mdHelpCircle,
    mdHelp: mdHelp,
    mdHome: mdHome,
    mdHourglass: mdHourglass,
    mdIceCream: mdIceCream,
    mdImage: mdImage,
    mdImages: mdImages,
    mdInfinite: mdInfinite,
    mdInformationCircleOutline: mdInformationCircleOutline,
    mdInformationCircle: mdInformationCircle,
    mdInformation: mdInformation,
    mdJet: mdJet,
    mdJournal: mdJournal,
    mdKey: mdKey,
    mdKeypad: mdKeypad,
    mdLaptop: mdLaptop,
    mdLeaf: mdLeaf,
    mdLink: mdLink,
    mdListBox: mdListBox,
    mdList: mdList,
    mdLocate: mdLocate,
    mdLock: mdLock,
    mdLogIn: mdLogIn,
    mdLogOut: mdLogOut,
    mdMagnet: mdMagnet,
    mdMailOpen: mdMailOpen,
    mdMailUnread: mdMailUnread,
    mdMail: mdMail,
    mdMale: mdMale,
    mdMan: mdMan,
    mdMap: mdMap,
    mdMedal: mdMedal,
    mdMedical: mdMedical,
    mdMedkit: mdMedkit,
    mdMegaphone: mdMegaphone,
    mdMenu: mdMenu,
    mdMicOff: mdMicOff,
    mdMic: mdMic,
    mdMicrophone: mdMicrophone,
    mdMoon: mdMoon,
    mdMore: mdMore,
    mdMove: mdMove,
    mdMusicalNote: mdMusicalNote,
    mdMusicalNotes: mdMusicalNotes,
    mdNavigate: mdNavigate,
    mdNotificationsOff: mdNotificationsOff,
    mdNotificationsOutline: mdNotificationsOutline,
    mdNotifications: mdNotifications,
    mdNuclear: mdNuclear,
    mdNutrition: mdNutrition,
    mdOpen: mdOpen,
    mdOptions: mdOptions,
    mdOutlet: mdOutlet,
    mdPaperPlane: mdPaperPlane,
    mdPaper: mdPaper,
    mdPartlySunny: mdPartlySunny,
    mdPause: mdPause,
    mdPaw: mdPaw,
    mdPeople: mdPeople,
    mdPersonAdd: mdPersonAdd,
    mdPerson: mdPerson,
    mdPhoneLandscape: mdPhoneLandscape,
    mdPhonePortrait: mdPhonePortrait,
    mdPhotos: mdPhotos,
    mdPie: mdPie,
    mdPin: mdPin,
    mdPint: mdPint,
    mdPizza: mdPizza,
    mdPlanet: mdPlanet,
    mdPlayCircle: mdPlayCircle,
    mdPlay: mdPlay,
    mdPodium: mdPodium,
    mdPower: mdPower,
    mdPricetag: mdPricetag,
    mdPricetags: mdPricetags,
    mdPrint: mdPrint,
    mdPulse: mdPulse,
    mdQrScanner: mdQrScanner,
    mdQuote: mdQuote,
    mdRadioButtonOff: mdRadioButtonOff,
    mdRadioButtonOn: mdRadioButtonOn,
    mdRadio: mdRadio,
    mdRainy: mdRainy,
    mdRecording: mdRecording,
    mdRedo: mdRedo,
    mdRefreshCircle: mdRefreshCircle,
    mdRefresh: mdRefresh,
    mdRemoveCircleOutline: mdRemoveCircleOutline,
    mdRemoveCircle: mdRemoveCircle,
    mdRemove: mdRemove,
    mdReorder: mdReorder,
    mdRepeat: mdRepeat,
    mdResize: mdResize,
    mdRestaurant: mdRestaurant,
    mdReturnLeft: mdReturnLeft,
    mdReturnRight: mdReturnRight,
    mdReverseCamera: mdReverseCamera,
    mdRewind: mdRewind,
    mdRibbon: mdRibbon,
    mdRocket: mdRocket,
    mdRose: mdRose,
    mdSad: mdSad,
    mdSave: mdSave,
    mdSchool: mdSchool,
    mdSearch: mdSearch,
    mdSend: mdSend,
    mdSettings: mdSettings,
    mdShareAlt: mdShareAlt,
    mdShare: mdShare,
    mdShirt: mdShirt,
    mdShuffle: mdShuffle,
    mdSkipBackward: mdSkipBackward,
    mdSkipForward: mdSkipForward,
    mdSnow: mdSnow,
    mdSpeedometer: mdSpeedometer,
    mdSquareOutline: mdSquareOutline,
    mdSquare: mdSquare,
    mdStarHalf: mdStarHalf,
    mdStarOutline: mdStarOutline,
    mdStar: mdStar,
    mdStats: mdStats,
    mdStopwatch: mdStopwatch,
    mdSubway: mdSubway,
    mdSunny: mdSunny,
    mdSwap: mdSwap,
    mdSwitch: mdSwitch,
    mdSync: mdSync,
    mdTabletLandscape: mdTabletLandscape,
    mdTabletPortrait: mdTabletPortrait,
    mdTennisball: mdTennisball,
    mdText: mdText,
    mdThermometer: mdThermometer,
    mdThumbsDown: mdThumbsDown,
    mdThumbsUp: mdThumbsUp,
    mdThunderstorm: mdThunderstorm,
    mdTime: mdTime,
    mdTimer: mdTimer,
    mdToday: mdToday,
    mdTrain: mdTrain,
    mdTransgender: mdTransgender,
    mdTrash: mdTrash,
    mdTrendingDown: mdTrendingDown,
    mdTrendingUp: mdTrendingUp,
    mdTrophy: mdTrophy,
    mdTv: mdTv,
    mdUmbrella: mdUmbrella,
    mdUndo: mdUndo,
    mdUnlock: mdUnlock,
    mdVideocam: mdVideocam,
    mdVolumeHigh: mdVolumeHigh,
    mdVolumeLow: mdVolumeLow,
    mdVolumeMute: mdVolumeMute,
    mdVolumeOff: mdVolumeOff,
    mdWalk: mdWalk,
    mdWallet: mdWallet,
    mdWarning: mdWarning,
    mdWatch: mdWatch,
    mdWater: mdWater,
    mdWifi: mdWifi,
    mdWine: mdWine,
    mdWoman: mdWoman
  },
  data () {
    return {
      pattern: '',
      names: [
        'ios-add-circle-outline',
        'ios-add-circle',
        'ios-add',
        'ios-airplane',
        'ios-alarm',
        'ios-albums',
        'ios-alert',
        'ios-american-football',
        'ios-analytics',
        'ios-aperture',
        'ios-apps',
        'ios-appstore',
        'ios-archive',
        'ios-arrow-back',
        'ios-arrow-down',
        'ios-arrow-dropdown-circle',
        'ios-arrow-dropdown',
        'ios-arrow-dropleft-circle',
        'ios-arrow-dropleft',
        'ios-arrow-dropright-circle',
        'ios-arrow-dropright',
        'ios-arrow-dropup-circle',
        'ios-arrow-dropup',
        'ios-arrow-forward',
        'ios-arrow-round-back',
        'ios-arrow-round-down',
        'ios-arrow-round-forward',
        'ios-arrow-round-up',
        'ios-arrow-up',
        'ios-at',
        'ios-attach',
        'ios-backspace',
        'ios-barcode',
        'ios-baseball',
        'ios-basket',
        'ios-basketball',
        'ios-battery-charging',
        'ios-battery-dead',
        'ios-battery-full',
        'ios-beaker',
        'ios-bed',
        'ios-beer',
        'ios-bicycle',
        'ios-bluetooth',
        'ios-boat',
        'ios-body',
        'ios-bonfire',
        'ios-book',
        'ios-bookmark',
        'ios-bookmarks',
        'ios-bowtie',
        'ios-briefcase',
        'ios-browsers',
        'ios-brush',
        'ios-bug',
        'ios-build',
        'ios-bulb',
        'ios-bus',
        'ios-business',
        'ios-cafe',
        'ios-calculator',
        'ios-calendar',
        'ios-call',
        'ios-camera',
        'ios-car',
        'ios-card',
        'ios-cart',
        'ios-cash',
        'ios-cellular',
        'ios-chatboxes',
        'ios-chatbubbles',
        'ios-checkbox-outline',
        'ios-checkbox',
        'ios-checkmark-circle-outline',
        'ios-checkmark-circle',
        'ios-checkmark',
        'ios-clipboard',
        'ios-clock',
        'ios-close-circle-outline',
        'ios-close-circle',
        'ios-close',
        'ios-cloud-circle',
        'ios-cloud-done',
        'ios-cloud-download',
        'ios-cloud-outline',
        'ios-cloud-upload',
        'ios-cloud',
        'ios-cloudy-night',
        'ios-cloudy',
        'ios-code-download',
        'ios-code-working',
        'ios-code',
        'ios-cog',
        'ios-color-fill',
        'ios-color-filter',
        'ios-color-palette',
        'ios-color-wand',
        'ios-compass',
        'ios-construct',
        'ios-contact',
        'ios-contacts',
        'ios-contract',
        'ios-contrast',
        'ios-copy',
        'ios-create',
        'ios-crop',
        'ios-cube',
        'ios-cut',
        'ios-desktop',
        'ios-disc',
        'ios-document',
        'ios-done-all',
        'ios-download',
        'ios-easel',
        'ios-egg',
        'ios-exit',
        'ios-expand',
        'ios-eye-off',
        'ios-eye',
        'ios-fastforward',
        'ios-female',
        'ios-filing',
        'ios-film',
        'ios-finger-print',
        'ios-fitness',
        'ios-flag',
        'ios-flame',
        'ios-flash-off',
        'ios-flash',
        'ios-flashlight',
        'ios-flask',
        'ios-flower',
        'ios-folder-open',
        'ios-folder',
        'ios-football',
        'ios-funnel',
        'ios-gift',
        'ios-git-branch',
        'ios-git-commit',
        'ios-git-compare',
        'ios-git-merge',
        'ios-git-network',
        'ios-git-pull-request',
        'ios-glasses',
        'ios-globe',
        'ios-grid',
        'ios-hammer',
        'ios-hand',
        'ios-happy',
        'ios-headset',
        'ios-heart-dislike',
        'ios-heart-empty',
        'ios-heart-half',
        'ios-heart',
        'ios-help-buoy',
        'ios-help-circle-outline',
        'ios-help-circle',
        'ios-help',
        'ios-home',
        'ios-hourglass',
        'ios-ice-cream',
        'ios-image',
        'ios-images',
        'ios-infinite',
        'ios-information-circle-outline',
        'ios-information-circle',
        'ios-information',
        'ios-jet',
        'ios-journal',
        'ios-key',
        'ios-keypad',
        'ios-laptop',
        'ios-leaf',
        'ios-link',
        'ios-list-box',
        'ios-list',
        'ios-locate',
        'ios-lock',
        'ios-log-in',
        'ios-log-out',
        'ios-magnet',
        'ios-mail-open',
        'ios-mail-unread',
        'ios-mail',
        'ios-male',
        'ios-man',
        'ios-map',
        'ios-medal',
        'ios-medical',
        'ios-medkit',
        'ios-megaphone',
        'ios-menu',
        'ios-mic-off',
        'ios-mic',
        'ios-microphone',
        'ios-moon',
        'ios-more',
        'ios-move',
        'ios-musical-note',
        'ios-musical-notes',
        'ios-navigate',
        'ios-notifications-off',
        'ios-notifications-outline',
        'ios-notifications',
        'ios-nuclear',
        'ios-nutrition',
        'ios-open',
        'ios-options',
        'ios-outlet',
        'ios-paper-plane',
        'ios-paper',
        'ios-partly-sunny',
        'ios-pause',
        'ios-paw',
        'ios-people',
        'ios-person-add',
        'ios-person',
        'ios-phone-landscape',
        'ios-phone-portrait',
        'ios-photos',
        'ios-pie',
        'ios-pin',
        'ios-pint',
        'ios-pizza',
        'ios-planet',
        'ios-play-circle',
        'ios-play',
        'ios-podium',
        'ios-power',
        'ios-pricetag',
        'ios-pricetags',
        'ios-print',
        'ios-pulse',
        'ios-qr-scanner',
        'ios-quote',
        'ios-radio-button-off',
        'ios-radio-button-on',
        'ios-radio',
        'ios-rainy',
        'ios-recording',
        'ios-redo',
        'ios-refresh-circle',
        'ios-refresh',
        'ios-remove-circle-outline',
        'ios-remove-circle',
        'ios-remove',
        'ios-reorder',
        'ios-repeat',
        'ios-resize',
        'ios-restaurant',
        'ios-return-left',
        'ios-return-right',
        'ios-reverse-camera',
        'ios-rewind',
        'ios-ribbon',
        'ios-rocket',
        'ios-rose',
        'ios-sad',
        'ios-save',
        'ios-school',
        'ios-search',
        'ios-send',
        'ios-settings',
        'ios-share-alt',
        'ios-share',
        'ios-shirt',
        'ios-shuffle',
        'ios-skip-backward',
        'ios-skip-forward',
        'ios-snow',
        'ios-speedometer',
        'ios-square-outline',
        'ios-square',
        'ios-star-half',
        'ios-star-outline',
        'ios-star',
        'ios-stats',
        'ios-stopwatch',
        'ios-subway',
        'ios-sunny',
        'ios-swap',
        'ios-switch',
        'ios-sync',
        'ios-tablet-landscape',
        'ios-tablet-portrait',
        'ios-tennisball',
        'ios-text',
        'ios-thermometer',
        'ios-thumbs-down',
        'ios-thumbs-up',
        'ios-thunderstorm',
        'ios-time',
        'ios-timer',
        'ios-today',
        'ios-train',
        'ios-transgender',
        'ios-trash',
        'ios-trending-down',
        'ios-trending-up',
        'ios-trophy',
        'ios-tv',
        'ios-umbrella',
        'ios-undo',
        'ios-unlock',
        'ios-videocam',
        'ios-volume-high',
        'ios-volume-low',
        'ios-volume-mute',
        'ios-volume-off',
        'ios-walk',
        'ios-wallet',
        'ios-warning',
        'ios-watch',
        'ios-water',
        'ios-wifi',
        'ios-wine',
        'ios-woman',
        'logo-android',
        'logo-angular',
        'logo-apple',
        'logo-bitbucket',
        'logo-bitcoin',
        'logo-buffer',
        'logo-chrome',
        'logo-closed-captioning',
        'logo-codepen',
        'logo-css3',
        'logo-designernews',
        'logo-dribbble',
        'logo-dropbox',
        'logo-euro',
        'logo-facebook',
        'logo-flickr',
        'logo-foursquare',
        'logo-freebsd-devil',
        'logo-game-controller-a',
        'logo-game-controller-b',
        'logo-github',
        'logo-google',
        'logo-googleplus',
        'logo-hackernews',
        'logo-html5',
        'logo-instagram',
        'logo-ionic',
        'logo-ionitron',
        'logo-javascript',
        'logo-linkedin',
        'logo-markdown',
        'logo-model-s',
        'logo-no-smoking',
        'logo-nodejs',
        'logo-npm',
        'logo-octocat',
        'logo-pinterest',
        'logo-playstation',
        'logo-polymer',
        'logo-python',
        'logo-reddit',
        'logo-rss',
        'logo-sass',
        'logo-skype',
        'logo-slack',
        'logo-snapchat',
        'logo-steam',
        'logo-tumblr',
        'logo-tux',
        'logo-twitch',
        'logo-twitter',
        'logo-usd',
        'logo-vimeo',
        'logo-vk',
        'logo-whatsapp',
        'logo-windows',
        'logo-wordpress',
        'logo-xbox',
        'logo-xing',
        'logo-yahoo',
        'logo-yen',
        'logo-youtube',
        'md-add-circle-outline',
        'md-add-circle',
        'md-add',
        'md-airplane',
        'md-alarm',
        'md-albums',
        'md-alert',
        'md-american-football',
        'md-analytics',
        'md-aperture',
        'md-apps',
        'md-appstore',
        'md-archive',
        'md-arrow-back',
        'md-arrow-down',
        'md-arrow-dropdown-circle',
        'md-arrow-dropdown',
        'md-arrow-dropleft-circle',
        'md-arrow-dropleft',
        'md-arrow-dropright-circle',
        'md-arrow-dropright',
        'md-arrow-dropup-circle',
        'md-arrow-dropup',
        'md-arrow-forward',
        'md-arrow-round-back',
        'md-arrow-round-down',
        'md-arrow-round-forward',
        'md-arrow-round-up',
        'md-arrow-up',
        'md-at',
        'md-attach',
        'md-backspace',
        'md-barcode',
        'md-baseball',
        'md-basket',
        'md-basketball',
        'md-battery-charging',
        'md-battery-dead',
        'md-battery-full',
        'md-beaker',
        'md-bed',
        'md-beer',
        'md-bicycle',
        'md-bluetooth',
        'md-boat',
        'md-body',
        'md-bonfire',
        'md-book',
        'md-bookmark',
        'md-bookmarks',
        'md-bowtie',
        'md-briefcase',
        'md-browsers',
        'md-brush',
        'md-bug',
        'md-build',
        'md-bulb',
        'md-bus',
        'md-business',
        'md-cafe',
        'md-calculator',
        'md-calendar',
        'md-call',
        'md-camera',
        'md-car',
        'md-card',
        'md-cart',
        'md-cash',
        'md-cellular',
        'md-chatboxes',
        'md-chatbubbles',
        'md-checkbox-outline',
        'md-checkbox',
        'md-checkmark-circle-outline',
        'md-checkmark-circle',
        'md-checkmark',
        'md-clipboard',
        'md-clock',
        'md-close-circle-outline',
        'md-close-circle',
        'md-close',
        'md-cloud-circle',
        'md-cloud-done',
        'md-cloud-download',
        'md-cloud-outline',
        'md-cloud-upload',
        'md-cloud',
        'md-cloudy-night',
        'md-cloudy',
        'md-code-download',
        'md-code-working',
        'md-code',
        'md-cog',
        'md-color-fill',
        'md-color-filter',
        'md-color-palette',
        'md-color-wand',
        'md-compass',
        'md-construct',
        'md-contact',
        'md-contacts',
        'md-contract',
        'md-contrast',
        'md-copy',
        'md-create',
        'md-crop',
        'md-cube',
        'md-cut',
        'md-desktop',
        'md-disc',
        'md-document',
        'md-done-all',
        'md-download',
        'md-easel',
        'md-egg',
        'md-exit',
        'md-expand',
        'md-eye-off',
        'md-eye',
        'md-fastforward',
        'md-female',
        'md-filing',
        'md-film',
        'md-finger-print',
        'md-fitness',
        'md-flag',
        'md-flame',
        'md-flash-off',
        'md-flash',
        'md-flashlight',
        'md-flask',
        'md-flower',
        'md-folder-open',
        'md-folder',
        'md-football',
        'md-funnel',
        'md-gift',
        'md-git-branch',
        'md-git-commit',
        'md-git-compare',
        'md-git-merge',
        'md-git-network',
        'md-git-pull-request',
        'md-glasses',
        'md-globe',
        'md-grid',
        'md-hammer',
        'md-hand',
        'md-happy',
        'md-headset',
        'md-heart-dislike',
        'md-heart-empty',
        'md-heart-half',
        'md-heart',
        'md-help-buoy',
        'md-help-circle-outline',
        'md-help-circle',
        'md-help',
        'md-home',
        'md-hourglass',
        'md-ice-cream',
        'md-image',
        'md-images',
        'md-infinite',
        'md-information-circle-outline',
        'md-information-circle',
        'md-information',
        'md-jet',
        'md-journal',
        'md-key',
        'md-keypad',
        'md-laptop',
        'md-leaf',
        'md-link',
        'md-list-box',
        'md-list',
        'md-locate',
        'md-lock',
        'md-log-in',
        'md-log-out',
        'md-magnet',
        'md-mail-open',
        'md-mail-unread',
        'md-mail',
        'md-male',
        'md-man',
        'md-map',
        'md-medal',
        'md-medical',
        'md-medkit',
        'md-megaphone',
        'md-menu',
        'md-mic-off',
        'md-mic',
        'md-microphone',
        'md-moon',
        'md-more',
        'md-move',
        'md-musical-note',
        'md-musical-notes',
        'md-navigate',
        'md-notifications-off',
        'md-notifications-outline',
        'md-notifications',
        'md-nuclear',
        'md-nutrition',
        'md-open',
        'md-options',
        'md-outlet',
        'md-paper-plane',
        'md-paper',
        'md-partly-sunny',
        'md-pause',
        'md-paw',
        'md-people',
        'md-person-add',
        'md-person',
        'md-phone-landscape',
        'md-phone-portrait',
        'md-photos',
        'md-pie',
        'md-pin',
        'md-pint',
        'md-pizza',
        'md-planet',
        'md-play-circle',
        'md-play',
        'md-podium',
        'md-power',
        'md-pricetag',
        'md-pricetags',
        'md-print',
        'md-pulse',
        'md-qr-scanner',
        'md-quote',
        'md-radio-button-off',
        'md-radio-button-on',
        'md-radio',
        'md-rainy',
        'md-recording',
        'md-redo',
        'md-refresh-circle',
        'md-refresh',
        'md-remove-circle-outline',
        'md-remove-circle',
        'md-remove',
        'md-reorder',
        'md-repeat',
        'md-resize',
        'md-restaurant',
        'md-return-left',
        'md-return-right',
        'md-reverse-camera',
        'md-rewind',
        'md-ribbon',
        'md-rocket',
        'md-rose',
        'md-sad',
        'md-save',
        'md-school',
        'md-search',
        'md-send',
        'md-settings',
        'md-share-alt',
        'md-share',
        'md-shirt',
        'md-shuffle',
        'md-skip-backward',
        'md-skip-forward',
        'md-snow',
        'md-speedometer',
        'md-square-outline',
        'md-square',
        'md-star-half',
        'md-star-outline',
        'md-star',
        'md-stats',
        'md-stopwatch',
        'md-subway',
        'md-sunny',
        'md-swap',
        'md-switch',
        'md-sync',
        'md-tablet-landscape',
        'md-tablet-portrait',
        'md-tennisball',
        'md-text',
        'md-thermometer',
        'md-thumbs-down',
        'md-thumbs-up',
        'md-thunderstorm',
        'md-time',
        'md-timer',
        'md-today',
        'md-train',
        'md-transgender',
        'md-trash',
        'md-trending-down',
        'md-trending-up',
        'md-trophy',
        'md-tv',
        'md-umbrella',
        'md-undo',
        'md-unlock',
        'md-videocam',
        'md-volume-high',
        'md-volume-low',
        'md-volume-mute',
        'md-volume-off',
        'md-walk',
        'md-wallet',
        'md-warning',
        'md-watch',
        'md-water',
        'md-wifi',
        'md-wine',
        'md-woman'
      ]
    }
  },
  computed: {
    filteredNames () {
      if (this.pattern.trim()) {
        const pattern = this.pattern.trim()
        return this.names.filter(name => ~(name.search(pattern)))
      } else {
        return this.names
      }
    }
  }
}
</script>

<style scoped>
.icons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
}
</style>
