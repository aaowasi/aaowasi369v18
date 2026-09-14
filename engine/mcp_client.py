"""Executable MCP protocol smoke test; launches only the fixed local server."""
import asyncio
import sys
from pathlib import Path
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    params = StdioServerParameters(command=sys.executable, args=['-m', 'engine.mcp_server'],
                                   cwd=str(Path(__file__).resolve().parents[1]))
    async with stdio_client(params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            tools = await session.list_tools()
            print('Tools:', ', '.join(t.name for t in tools.tools))
            result = await session.call_tool('query_risks', {'limit': 1})
            if result.isError:
                raise RuntimeError('MCP query failed')
            print('MCP risk query passed')
            from datetime import datetime, timezone
            calls = [
                ('evaluate_vendor_security', {'vendor': {'name': 'Protocol test',
                  'critical_service': True, 'personal_data': True, 'dpa_signed': False,
                  'subprocessors_authorized': True, 'training_opt_out': True,
                  'security_evidence_date': datetime.now(timezone.utc).date().isoformat()}}),
                ('screen_prompt', {'text': 'Public protocol test', 'approved_channel': True}),
                ('query_control_results', {})]
            for name, arguments in calls:
                response = await session.call_tool(name, arguments)
                if response.isError:
                    raise RuntimeError(name + ' failed')
                print(name + ': protocol call passed')

if __name__ == '__main__':
    asyncio.run(main())
