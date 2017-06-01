import { create as createModulesLoader } from '../helpers/modules-loader.helper';
import * as matcher from './matcher';

const modulesLoader = createModulesLoader();

class Matchers {
  constructor(loader) {
    this.availableMatchers = [
      matcher.regexMatcher,
      matcher.clickableMatcher,
      matcher.invisibleMatcher,
      matcher.notClickableMatcher,
      matcher.presentMatcher,
      matcher.textMatcher,
      matcher.visibleMatcher
    ];
  }

  addMatcher(matcher) {
    this.availableMatchers.push(matcher);
  }

  match(element, matcherName) {
    const matcher = this.findMatcher(matcherName.substr(0, 2), matcherName.substr(2));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, matcherName);
  }

  findMatcher(prefix, name) {
    return this.availableMatchers.find((matcher) => matcher.isSatisfiedBy(prefix, name));
  }
}

export const create = (loader = modulesLoader) => new Matchers(loader);
