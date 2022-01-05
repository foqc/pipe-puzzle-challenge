import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { PipeSquare } from './entities/types';
import { fromArrayToPipe, getPipeSidesArray } from './utils/utils';

const pipeSquare = new PipeSquare({ hasTop: false, hasRight: true, hasBottom: true, hasLeft: true }, false, 'red')
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('test if pipe has T shape', () => {
  const tPipe = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: false }//┣
  expect(pipeSquare.isTPipe(getPipeSidesArray(tPipe))).toBe(true)

  const tPipe2 = { hasTop: false, hasRight: true, hasBottom: true, hasLeft: true }//┳
  expect(pipeSquare.isTPipe(getPipeSidesArray(tPipe2))).toBe(true)

  const tPipe3 = { hasTop: true, hasRight: false, hasBottom: true, hasLeft: true } //┫
  expect(pipeSquare.isTPipe(getPipeSidesArray(tPipe3))).toBe(true)

  const tPipe4 = { hasTop: true, hasRight: true, hasBottom: false, hasLeft: true } //┻
  expect(pipeSquare.isTPipe(getPipeSidesArray(tPipe4))).toBe(true)

  const tPipe5 = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: true }
  expect(pipeSquare.isTPipe(getPipeSidesArray(tPipe5))).toBe(false)
});


test('test if pipe has elbow shape', () => {
  const tPipe = { hasTop: false, hasRight: false, hasBottom: true, hasLeft: true }//┓
  expect(pipeSquare.isElbowPipe(getPipeSidesArray(tPipe))).toBe(true)

  const tPipe2 = { hasTop: true, hasRight: false, hasBottom: false, hasLeft: true }//┛
  expect(pipeSquare.isElbowPipe(getPipeSidesArray(tPipe2))).toBe(true)

  const tPipe3 = { hasTop: true, hasRight: true, hasBottom: false, hasLeft: false } //┗
  expect(pipeSquare.isElbowPipe(getPipeSidesArray(tPipe3))).toBe(true)

  const tPipe4 = { hasTop: false, hasRight: true, hasBottom: true, hasLeft: false } //┏
  expect(pipeSquare.isElbowPipe(getPipeSidesArray(tPipe4))).toBe(true)

  const tPipe5 = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: true }
  expect(pipeSquare.isElbowPipe(getPipeSidesArray(tPipe5))).toBe(false)
});

test('test if pipe has small line shape', () => {
  const tPipe = { hasTop: false, hasRight: false, hasBottom: false, hasLeft: true }//╸
  expect(pipeSquare.isSmallLinePipe(getPipeSidesArray(tPipe))).toBe(true)

  const tPipe2 = { hasTop: true, hasRight: false, hasBottom: false, hasLeft: false }//╹
  expect(pipeSquare.isSmallLinePipe(getPipeSidesArray(tPipe2))).toBe(true)

  const tPipe3 = { hasTop: false, hasRight: true, hasBottom: false, hasLeft: false } //╺
  expect(pipeSquare.isSmallLinePipe(getPipeSidesArray(tPipe3))).toBe(true)

  const tPipe4 = { hasTop: false, hasRight: false, hasBottom: true, hasLeft: false } //╻
  expect(pipeSquare.isSmallLinePipe(getPipeSidesArray(tPipe4))).toBe(true)

  const tPipe5 = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: true }
  expect(pipeSquare.isSmallLinePipe(getPipeSidesArray(tPipe5))).toBe(false)
});

test('test if pipe has large line shape', () => {
  const tPipe = { hasTop: false, hasRight: true, hasBottom: false, hasLeft: true }//━
  expect(pipeSquare.isLargeLinePipe(getPipeSidesArray(tPipe))).toBe(true)

  const tPipe2 = { hasTop: true, hasRight: false, hasBottom: true, hasLeft: false }//┃
  expect(pipeSquare.isLargeLinePipe(getPipeSidesArray(tPipe2))).toBe(true)

  const tPipe5 = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: true }
  expect(pipeSquare.isLargeLinePipe(getPipeSidesArray(tPipe5))).toBe(false)
});

test('test if pipe has cross line shape', () => {
  const tPipe = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: true }//╋
  expect(pipeSquare.isCrossLinePipe(getPipeSidesArray(tPipe))).toBe(true)

  const tPipe5 = { hasTop: true, hasRight: false, hasBottom: true, hasLeft: true }
  expect(pipeSquare.isCrossLinePipe(getPipeSidesArray(tPipe5))).toBe(false)
});

test('test T shape pipe when rotate', () => {
  const tPipe = { hasTop: true, hasRight: true, hasBottom: true, hasLeft: false }//┣

  const tPipe1 = { hasTop: false, hasRight: true, hasBottom: true, hasLeft: true } //┳
  expect(fromArrayToPipe(pipeSquare.rotateTPipe(getPipeSidesArray(tPipe))))
    .toStrictEqual(tPipe1)

  const tPipe2 = { hasTop: true, hasRight: false, hasBottom: true, hasLeft: true } //┫

  expect(fromArrayToPipe(pipeSquare.rotateTPipe(getPipeSidesArray(tPipe1))))
    .toStrictEqual(tPipe2)


  const tPipe3 = { hasTop: true, hasRight: true, hasBottom: false, hasLeft: true } //┻
  expect(fromArrayToPipe(pipeSquare.rotateTPipe(getPipeSidesArray(tPipe2))))
    .toStrictEqual(tPipe3)

  expect(fromArrayToPipe(pipeSquare.rotateTPipe(getPipeSidesArray(tPipe3)))).not
    .toStrictEqual(tPipe1)
});

test('test elbow shape pipe when rotate', () => {

  const tPipe = { hasTop: false, hasRight: false, hasBottom: true, hasLeft: true }//┓
  const tPipe1 = { hasTop: true, hasRight: false, hasBottom: false, hasLeft: true }//┛
  expect(fromArrayToPipe(pipeSquare.rotateElbowPipe(getPipeSidesArray(tPipe))))
    .toStrictEqual(tPipe1)

  const tPipe2 = { hasTop: true, hasRight: true, hasBottom: false, hasLeft: false } //┗


  expect(fromArrayToPipe(pipeSquare.rotateElbowPipe(getPipeSidesArray(tPipe1))))
    .toStrictEqual(tPipe2)

  const tPipe3 = { hasTop: false, hasRight: true, hasBottom: true, hasLeft: false } //┏
  expect(fromArrayToPipe(pipeSquare.rotateElbowPipe(getPipeSidesArray(tPipe2))))
    .toStrictEqual(tPipe3)

  expect(fromArrayToPipe(pipeSquare.rotateElbowPipe(getPipeSidesArray(tPipe3)))).not
    .toStrictEqual(tPipe1)
});