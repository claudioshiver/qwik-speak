import { createDOM } from '@builder.io/qwik/testing';
import { component$ } from '@builder.io/qwik';
import { test, describe, expect } from 'vitest';

import { usePlural } from '../src/use-plural';
import { QwikSpeakProvider } from '../src/qwik-speak-component';
import { config, translationFnStub } from './config';

const TestComponent = component$(() => {
  const p = usePlural();

  return (
    <div>
      <div id="A">{p(1, '', { role: 'software' })}</div>
      <div id="A1">{p(2, '', { role: 'software' })}</div>
    </div>
  );
});

describe('usePlural function', async () => {
  const { screen, render } = await createDOM();

  await render(
    <QwikSpeakProvider config={config} translationFn={translationFnStub} locale={config.defaultLocale}>
      <TestComponent />
    </QwikSpeakProvider>
  );

  test('plural', () => {
    expect((screen.querySelector('#A') as HTMLDivElement).innerHTML).toContain('One software developer');
    expect((screen.querySelector('#A1') as HTMLDivElement).innerHTML).toContain('2 software developers');
  });
});
