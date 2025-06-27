import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import {
  BlockQuoteFeature,
  BoldTextFeature,
  HeadingFeature,
  ItalicTextFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineTextFeature,
  UnorderedListFeature,
  IndentFeature,
  HorizontalRuleFeature,
  TreeViewFeature,
} from '@payloadcms/richtext-lexical'

import { LabelFeature } from '../lexicalFeatures/label'
import { LargeBodyFeature } from '../lexicalFeatures/largeBody'
import { LineBreakNode } from 'lexical'

export const defaultPublicDemoFeatures: FeatureProvider[] = [
  ParagraphFeature(),
  BoldTextFeature(),
  ItalicTextFeature(),
  UnderlineTextFeature(),
  BlockQuoteFeature(),
  HeadingFeature({
    enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  }),
  LinkFeature({}),
  LargeBodyFeature(),
  LabelFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  IndentFeature(),
  HorizontalRuleFeature(),
  TreeViewFeature(),
]
