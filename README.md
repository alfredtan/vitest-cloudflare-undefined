## Repo to show test fails on re-run

This project uses the default Hello World worker created using `npm create cloudflare`

Run `npm install`, then
`npx vitest` or `npx vitest --ui`

Vitest will launch with all pass. After that, trigger a save on `test/index.spec.ts` file or manually click the 'play' button on Vitest UI, and the test will with fail.

The `vi.mocked( Thing ).prototype.getNum = vi.fn().mockReturnValue( 20 )` is returning `undefined` for subsequent test re-runs (while vitest is watching).
