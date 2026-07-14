/**
 * Demo / Mode A vs Mode B data source switch (ADR-0003).
 *
 * USE_SCENIC_MOCK = true  → Mock-only (classmate demo default)
 * USE_SCENIC_MOCK = false → API first, Mock fallback (personal Mode B branch)
 *
 * Do not flip to false for classmate demos unless API + DB are intentionally up.
 */
export const USE_SCENIC_MOCK = true

export function isScenicMockOnly() {
	return USE_SCENIC_MOCK !== false
}
