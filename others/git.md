### 将部分提交合并到另一个分支上
``` bash
git cherry-pick <commit id>:单独合并一个提交
git cherry-pick -x <commit id>：同上，不同点：保留原提交者信息。
git cherry-pick <start-commit-id>..<end-commit-id>: 表示把到之间(左开右闭，不包含start-commit-id)的提交cherry-pick到当前分支；
git cherry-pick <start-commit-id>^..<end-commit-id>: 有^标志的表示把到之间(闭区间，包含start-commit-id)的提交cherry-pick到当前分支。
```