import type { TutorialConfig } from '../../types/tutorial';
import { tutorialGroups, tutorialGroupOrder } from './groups';

// Dynamic tutorial configuration loader
const getTutorialConfig = (): TutorialConfig => {
  const configs = import.meta.glob('./*/config.ts', { eager: true });
  const tutorialConfigs: TutorialConfig = {};

  Object.entries(configs).forEach(([path, module]) => {
    // Extract tutorial ID from path (e.g., './abap-security/config.ts' -> 'abap-security')
    const tutorialId = path.split('/')[1];
    const config = (module as any).tutorialConfig;

    // Find group by checking tutorial lists
    const group = Object.entries(tutorialGroups).find(([_, groupData]) =>
      groupData.tutorials.includes(tutorialId || ''))?.[0] || 'misc';
    if (tutorialId) {
      tutorialConfigs[tutorialId] = {
        ...config,
        group
      };
    }
  });
  return tutorialConfigs;
};

export const tutorialConfig = getTutorialConfig();
export { tutorialGroups, tutorialGroupOrder };