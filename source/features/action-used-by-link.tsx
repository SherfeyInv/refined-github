import React from 'dom-chef';
import {$} from 'select-dom/strict.js';
import SearchIcon from 'octicons-plain-react/Search';
import * as pageDetect from 'github-url-detection';

import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function getActionURL(): URL {
	const actionRepo = $('aside a:has(.octicon-repo)')
		.pathname
		.slice(1);

	const actionURL = new URL('search', location.origin);
	actionURL.search = new URLSearchParams({
		q: `${actionRepo} path:.github/workflows/ language:YAML`,
		type: 'Code',
		s: 'indexed',
		o: 'desc',
	}).toString();

	return actionURL;
}

function addUsageLink(side: HTMLElement): void {
	const actionURL = getActionURL();

	side.after(
		<a href={actionURL.href} className="d-block mb-2">
			<SearchIcon width={14} className="color-fg-default mr-2" />Usage examples
		</a>,
	);
}

function init(signal: AbortSignal): void {
	observe('.d-block.mb-2[href^="/contact"]', addUsageLink, {signal});
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isMarketplaceAction,
	],
	init,
});

/*

Test URLs:

https://github.com/marketplace/actions/title-replacer

*/
