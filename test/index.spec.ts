// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import worker from '../src/index';
import { Thing } from '../src/Thing.js';

// mock the class that will be called by the worker
// vi.mock( "../src/Thing", async ( importOriginal ) => {

// 	const actual = await importOriginal<typeof import( "../src/Thing" )>()
// 	return {
// 		...actual,
// 	};
// } );

vi.mock( "../src/Thing.js" )


// vi.mock( "../src/Thing.js", async ( importOriginal ) => {

// 	const actual = await importOriginal<typeof import( "../src/Thing" )>()
// 	// actual.Thing.prototype.getNum = vi.fn()
// 	return {
// 		...actual,
// 		Thing: vi.fn().mockImplementation( () => {
// 			console.log( 'Mocked constructor' );
// 			return {
// 				getNum: vi.fn().mockReturnValue( 30 )
// 			}
// 		} )
// 	}
// } );



// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe( 'Hello World worker', () => {

	it( 'should return a number', async () => {

		// original method returns 2
		// mock the method to return a different value

		// vi.mocked( Thing ).mockImplementation( () => {
		// 	console.log( "mock implementation" );
		// 	return {
		// 		getNum: vi.fn().mockReturnValue( 20 )
		// 	}
		// } )
		vi.mocked( Thing ).prototype.getNum = vi.fn().mockReturnValue( 20 )


		const request = new IncomingRequest( 'http://example.com' );
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch( request, env, ctx );
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext( ctx );
		expect( await response.text() ).toMatchInlineSnapshot( `"Num is 20"` );
	} );

} );
