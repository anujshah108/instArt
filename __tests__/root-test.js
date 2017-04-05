import 'react-native';
import React from 'react';
import Main from '../src/components/testCamera';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Main />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});