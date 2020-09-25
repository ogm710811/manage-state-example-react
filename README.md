# How to manage State in React.

When building a React app, how do I manage state?<br />
The question should be: Is the UI state as same as Server cache?<br />
The answer: Server cache is not the same as UI state, and they should be handled differently.

## App State

Keep state as low as possible.
1. Local State
2. Lift State
3. Global State (with contexts)

Once you are dealing with Global State, you are welcome to use:<br />
MobX, Redux, Overmind, Zustand, Recoil, etc... or just stick with `useState`

## External Data or Server Cache

What happened when you take the data coming from the server and treat it like it was UI state. It mixes
in with the actual UI state (stuff that's not persisted. You know, the stuff that goes away when you refresh 
the page), and this resulted in making both more complex. I would fail at state synchronization.
Found myself in "impossible" states that were difficult to debug.

Once you understand this, you are welcome to use:<br />
React Query, SWR, Apollo Client, urql
