import {
  BaselineWithExperiencesEntry,
  Entry,
  ExperienceMapper,
} from '@ninetailed/experience.js-utils-contentful';
import { SettingsContext } from './SettingsProvider';
import { useContext } from 'react';

export type singularBlock = Entry | BaselineWithExperiencesEntry | undefined;
export type singularOrArrayBlock = singularBlock | singularBlock[];

export const hasExperiences = (
  entry: unknown
): entry is BaselineWithExperiencesEntry => {
  return (
    (entry as BaselineWithExperiencesEntry).fields.nt_experiences !== undefined
  );
};

export const parseExperiences = (entry: unknown) => {
  return hasExperiences(entry)
    ? entry.fields.nt_experiences
        .filter((experience) => ExperienceMapper.isExperienceEntry(experience))
        .map((experience) => ExperienceMapper.mapExperience(experience))
    : [];
};

export const hoistId = (entry: singularBlock) => {
  if (entry) {
    return {
      ...entry,
      id: entry.sys.id,
    };
  }
  return {
    id: '',
  };
};
