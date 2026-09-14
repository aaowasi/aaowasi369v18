"""Local stdio MCP boundary: fixed files, typed inputs, no arbitrary URL or shell."""
import json
from pathlib import Path
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, ConfigDict, Field
from engine.decisions import evaluate_vendor, inspect_prompt

ROOT = Path(__file__).resolve().parents[1]
mcp = FastMCP('AAO governance engine')

class VendorInput(BaseModel):
    model_config = ConfigDict(extra='forbid', strict=True)
    name: str = Field(min_length=1, max_length=120)
    critical_service: bool | None
    personal_data: bool | None
    dpa_signed: bool | None
    subprocessors_authorized: bool | None
    training_opt_out: bool | None
    security_evidence_date: str = Field(max_length=32)

@mcp.tool()
def query_risks(category: str = '', limit: int = 20) -> dict:
    """Read the portfolio risk register. All rows are modeled, not client telemetry."""
    if not 1 <= limit <= 100 or len(category) > 80:
        raise ValueError('Invalid query bounds')
    data = json.loads((ROOT / 'site/data/portfolio.json').read_text())
    rows = [r for r in data['risks'] if not category or r['category'] == category]
    return {'mode': 'modeled', 'risks': rows[:limit], 'total': len(rows)}

@mcp.tool()
def evaluate_vendor_security(vendor: VendorInput) -> dict:
    """Evaluate structured intake; return a recommendation, never procurement approval."""
    return evaluate_vendor(vendor.model_dump())

@mcp.tool()
def screen_prompt(text: str, approved_channel: bool = False) -> dict:
    """Inspect supplied text locally; return counts only and never persist raw prompts."""
    return inspect_prompt(text, approved_channel)

@mcp.tool()
def query_control_results() -> dict:
    """Read the most recent sanitized CCM snapshot with mode and observation timestamps."""
    return json.loads((ROOT / 'site/data/ccm.json').read_text())

if __name__ == '__main__':
    mcp.run(transport='stdio')
