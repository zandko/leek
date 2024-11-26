## Prisma 命令说明文档

### 基本命令

1. **`prisma:migrate:dev`**
   - **命令**：`npx prisma migrate dev`
   - **说明**：在开发环境中创建和应用迁移。会基于 `schema.prisma` 中的最新模型，生成数据库迁移文件。
   - **用法**：适合在开发阶段频繁修改模型结构时使用。创建迁移并将其自动应用到数据库。

2. **`prisma:db:push`**
   - **命令**：`npx prisma db push`
   - **说明**：将 `schema.prisma` 中的模型结构直接推送到数据库，而不创建迁移文件。不会影响现有的数据，只更新数据库结构。
   - **用法**：适合在开发早期快速同步数据库结构，但不需要保存迁移记录。

3. **`prisma:db:pull`**
   - **命令**：`npx prisma db pull`
   - **说明**：从当前数据库中反向生成 `schema.prisma`，以同步 Prisma 模型与数据库结构。
   - **用法**：适用于已有数据库，反向生成 Prisma 模型，帮助快速同步数据库与 Prisma。

4. **`prisma:migrate:deploy`**
   - **命令**：`npx prisma migrate deploy`
   - **说明**：在生产环境中应用所有未部署的迁移，确保数据库结构与迁移文件保持一致。
   - **用法**：在生产环境中部署迁移时使用，确保数据库结构与 `Prisma` 模型一致。

5. **`prisma:migrate:reset`**
   - **命令**：`prisma migrate reset`
   - **说明**：重置数据库，重新应用所有迁移。会删除现有的所有数据并重新创建表结构。
   - **用法**：通常在开发环境使用，快速清空并重置数据库结构和数据。

6. **`prisma:generate`**
   - **命令**：`npx prisma generate`
   - **说明**：基于 `schema.prisma` 生成 Prisma 客户端代码，确保项目中的 Prisma 客户端与模型一致。
   - **用法**：每次更新 `schema.prisma` 后，运行此命令以更新 Prisma 客户端代码。

7. **`prisma:studio`**
   - **命令**：`npx prisma studio`
   - **说明**：打开 Prisma Studio，提供图形化界面来查看和编辑数据库中的数据。
   - **用法**：适合在开发和测试阶段，快速查看和编辑数据库中的数据。

### 迁移和执行命令

8. **`prisma:migrate:diff`**
   - **命令**：`npx prisma migrate diff --from-schema-datamodel ./prisma/schema.prisma --to-schema-datasource ./prisma/schema.prisma --script > down.sql`
   - **说明**：生成当前模型和数据库结构之间的差异 SQL 脚本，保存到 `down.sql` 文件。
   - **用法**：用于生成与数据库结构的差异 SQL 脚本，通常用于数据库回滚或检查更改。

9. **`prisma:db:execute:down`**
   - **命令**：`npx prisma db execute --file down.sql --schema prisma/schema.prisma`
   - **说明**：执行 `down.sql` 文件中的 SQL 脚本，以更新数据库结构。可以用于回滚数据库更改。
   - **用法**：在需要回滚数据库更改或手动更新数据库时使用。

---

### 示例用法

```bash
# 生成并应用迁移
npm run prisma:migrate:dev

# 直接将模型推送到数据库（不生成迁移文件）
npm run prisma:db:push

# 从现有数据库结构生成 Prisma 模型
npm run prisma:db:pull

# 部署迁移到生产数据库
npm run prisma:migrate:deploy

# 重置数据库并重新应用迁移（开发环境使用）
npm run prisma:migrate:reset

# 生成 Prisma 客户端代码
npm run prisma:generate

# 启动 Prisma Studio 图形界面
npm run prisma:studio

# 生成与数据库的差异 SQL 脚本
npm run prisma:migrate:diff

# 执行差异 SQL 脚本（通常用于回滚）
npm run prisma:db:execute:down
```

### 注意事项

- **开发环境 vs. 生产环境**：`migrate:dev` 适合开发环境，`migrate:deploy` 更适合生产环境。
- **回滚迁移**：回滚的过程在生产环境要谨慎，确保备份数据并做好测试。
- **Prisma Studio**：在开发和测试阶段使用，不建议在生产环境中直接操作数据库数据。
