export type RoleMode = 'child' | 'parent'

let currentRoleMode: RoleMode = 'child'

export function getRoleMode(): RoleMode {
  return currentRoleMode
}

export function setRoleMode(roleMode: RoleMode) {
  currentRoleMode = roleMode
}
