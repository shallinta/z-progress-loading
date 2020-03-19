// Reference: https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md

module.exports = {
  types: [
    { type: "feat", section: '特性' },
    { type: "fix", section: 'Bug 修复' },
    { type: "chore", section: '其他' },
    { type: "docs", section: '文档' },
    { type: "style", hidden: true },
    { type: "refactor", section: '重构' },
    { type: "perf", section: '优化' },
    { type: "test", hidden: true }
  ]
};