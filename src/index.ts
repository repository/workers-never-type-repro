import { WorkerEntrypoint } from "cloudflare:workers";

interface NestedUnknown {
	bar: unknown[];
}

class Foo extends WorkerEntrypoint {
	public wtf(): unknown {
		return;
	}

	wtf2(): NestedUnknown {
		return { bar: [] };
	}
}

type TestService = Service<Foo>;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const testService = {} as TestService;

		//     VV this is never type for some reason
		const blah = await testService.wtf();

		// also this is never type
		const nested = await testService.wtf2();

		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
