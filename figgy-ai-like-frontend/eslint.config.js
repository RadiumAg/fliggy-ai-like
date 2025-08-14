// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  react: true,
  javascript: true,
}, {
  // Without `files`, they are general rules for all files
  rules: {
    'style/semi': ['error', 'always'],
  },
});
