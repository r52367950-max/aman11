# 后端登录系统讨论稿（v0）

> 目的：在“先讨论再开发文档”的阶段，给出可落地的后端登录系统方案，重点围绕**性能、稳定性、安全性**。

## 1. 当前已知输入（来自需求沟通）

1. 目标：提升性能，初步开发登录系统。
2. 功能范围：登录。
3. 接口数量：暂不确定。
4. 数据库：可以改动。
5. 权限体系：可以改动。
6. 主要风险关注：安全和稳定性。

## 2. 本期建议范围（MVP）

### 必做

- 账号密码登录（手机号/邮箱 + 密码二选一，建议先做一种）
- 登录态发放（推荐 JWT Access Token + Refresh Token）
- 统一错误码（账号不存在、密码错误、账号锁定、频率限制）
- 基础安全策略（限流、密码哈希、审计日志）

### 可选（建议排到下一期）

- 短信/邮箱验证码登录
- 多因素认证（MFA）
- 单点登录（SSO）
- 风险设备识别与异地登录提醒

## 3. 技术实现建议

## 3.1 认证方案

- **Access Token**：短有效期（10~30 分钟）
- **Refresh Token**：长有效期（7~30 天），服务端可撤销
- **Token 存储建议**：
  - Web：`HttpOnly + Secure + SameSite` Cookie（优先）
  - App：安全存储（Keychain/Keystore）

## 3.2 密码安全

- 使用 `Argon2id`（首选）或 `bcrypt` 进行哈希，禁止明文或可逆加密。
- 密码策略：长度、复杂度、弱口令黑名单。
- 连续失败锁定：如 5 次失败锁定 15 分钟。

## 3.3 性能优化点（登录链路）

1. **数据库索引**：对登录标识（如 email/phone）建立唯一索引。
2. **减少慢查询**：登录流程仅做必要查询（用户、状态、凭证校验）。
3. **缓存热点**：
   - 账号锁定状态与失败计数放 Redis。
   - 短期会话黑名单（登出/撤销）可放 Redis。
4. **无状态扩展**：应用层横向扩容，避免本地会话粘连。
5. **异步审计**：登录日志异步写入，减小主链路延迟。

## 3.4 稳定性设计

- 限流与防刷：IP 级 + 账号级双限流。
- 依赖降级：Redis 异常时采取保守策略（例如提高校验强度/短时拒绝高频请求）。
- 可观测性：
  - 指标：登录成功率、P95/P99 延迟、失败原因分布、锁定数量。
  - 日志：traceId、userId、ip、ua、结果码。
  - 告警：成功率下降、错误码突增、延迟抖动。

## 4. 数据模型建议（可改库前提）

### `users`

- id
- login_id（email 或 phone）
- password_hash
- status（active/locked/disabled）
- failed_login_count
- lock_until
- created_at / updated_at

### `refresh_tokens`

- id
- user_id
- token_hash
- expires_at
- revoked_at
- device_info / ip
- created_at

### `auth_audit_logs`

- id
- user_id（可空）
- login_id
- action（login_success/login_failed/logout/refresh）
- reason_code
- ip / ua
- trace_id
- created_at

## 5. API 草案（讨论版）

1. `POST /api/auth/login`
   - 入参：`loginId`, `password`
   - 出参：`accessToken`, `refreshToken`（或通过 Cookie 下发）
2. `POST /api/auth/refresh`
   - 入参：`refreshToken`
   - 出参：新 `accessToken`（可轮换 refreshToken）
3. `POST /api/auth/logout`
   - 入参：当前会话 token
   - 出参：`ok`

> 统一错误码建议：
> - `AUTH_INVALID_CREDENTIALS`
> - `AUTH_ACCOUNT_LOCKED`
> - `AUTH_TOO_MANY_REQUESTS`
> - `AUTH_TOKEN_EXPIRED`

## 6. 里程碑建议

### M1（1~2 天）
- 数据表迁移脚本
- 登录/刷新/登出 API 基础实现

### M2（1 天）
- 限流、锁定策略、审计日志
- 指标与告警埋点

### M3（0.5~1 天）
- 压测与安全自测
- 上线与回滚预案

## 7. 开发文档（下一步）建议目录

1. 背景与目标
2. 范围与非范围
3. 详细 API 契约
4. 数据库变更与迁移方案
5. 安全设计（哈希、限流、风控）
6. 性能指标与压测报告模板
7. 监控告警与值班手册
8. 发布/灰度/回滚方案
9. 测试用例矩阵

## 8. 需要继续确认的事项

- 登录标识先选 email 还是 phone？
- token 生命周期最终取值？
- 是否要求“单设备登录”或“多设备并存”？
- 是否要在 MVP 引入验证码（图形/短信）？
- 合规要求：密码复杂度、日志保留时长、IP 记录策略。
