// @ts-check
import { registerHelpers } from './utils.js';
import router from "./router.js";
import { speakersPage } from "./speakers/index.js";
import { speakerPage } from "./speaker/index.js";
import { conferencesPage } from "./conferences/index.js";

// compile HBS layout
registerHelpers();

router.register('speaker', speakerPage);
router.register('speakers', speakersPage);
router.register('conferences', conferencesPage);
