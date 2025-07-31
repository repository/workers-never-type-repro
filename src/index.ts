import { WorkerEntrypoint } from "cloudflare:workers";

class Foo extends WorkerEntrypoint {
	public wtf(): unknown {
		return;
	}
}

type TestService = Service<Foo>;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const testService = {} as TestService;

		//     VV this is never type for some reason
		const blah = await testService.wtf();

		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;
