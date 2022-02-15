import Component from '@ember/component';
import { classNames } from '@ember-decorators/component';
import { styleNamespace } from './test-classic.scss';

@classNames(styleNamespace)
export default class TestClassic extends Component {}