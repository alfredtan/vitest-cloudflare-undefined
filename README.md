## Repo to show test fails on 2nd run.

This project uses the default Hello World worker created using `npm create cloudflare`

Run `npm install`, then
`npx vitest` or `npx vitest --ui`

Vitest will launch with all pass. After that, trigger a save on `test/index.spec.ts` file and the test will update with fails.

The `vi.mocked( Thing ).prototype.getNum = vi.fn().mockReturnValue( 20 )` is returning `undefined` for subsequent test re-runs (while vitest is watching).
