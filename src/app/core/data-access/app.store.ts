import { type AuthState, withAuthStore } from '@core/auth/auth.store';
import {
	signalStore,
	withState
} from '@ngrx/signals';

export type RequestStatus = 'idle' | 'pending' | 'fulfilled';

interface AppState {
	auth?: AuthState;
}

const initialAppState: AppState = {};

export const AppStore = signalStore(
	{ providedIn: 'root' },
	withState<AppState>(initialAppState),
	withAuthStore(),
);
