/*////////////////////////////////////////////////////////////////
aleaPRNG 1.1
//////////////////////////////////////////////////////////////////
https://github.com/macmcmeans/aleaPRNG/blob/master/aleaPRNG-1.1.js
//////////////////////////////////////////////////////////////////
Original work copyright © 2010 Johannes Baagøe, under MIT license
This is a derivative work copyright (c) 2017-2020, W. Mac" McMeans, under BSD license.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////*/
export interface AleaPRNG {
	(): number;
	fract53(): number;
	int32(): number;
	cycle(_run?: number): void;
	range(loBound: number, hiBound?: number): number;
	restart(): void;
	seed(...args: (string | number)[]): void;
	version(): string;
	versions(): string;
}

export function aleaPRNG(...args: (string | number)[]): AleaPRNG {
	return (function (args: (string | number)[]): AleaPRNG {
		"use strict";

		const version = "aleaPRNG 1.1.0";

		let s0: number;
		let s1: number;
		let s2: number;
		let c: number;
		const uinta = new Uint32Array(3);
		let initialArgs: (string | number)[];
		let mashver = "";

		/* private: initializes generator with specified seed */
		function _initState(_internalSeed: (string | number)[]): void {
			const mash = Mash();

			// internal state of generator
			s0 = mash(" ");
			s1 = mash(" ");
			s2 = mash(" ");

			c = 1;

			for (let i = 0; i < _internalSeed.length; i++) {
				s0 -= mash(_internalSeed[i]);
				if (s0 < 0) {
					s0 += 1;
				}

				s1 -= mash(_internalSeed[i]);
				if (s1 < 0) {
					s1 += 1;
				}

				s2 -= mash(_internalSeed[i]);
				if (s2 < 0) {
					s2 += 1;
				}
			}

			mashver = mash.version;
		}

		/* private: dependent string hash function */
		function Mash(): ((data: string | number) => number) & { version: string } {
			let n = 4022871197; // 0xefc8249d

			const mash = function (data: string | number): number {
				data = data.toString();

				// cache the length
				for (let i = 0, l = data.length; i < l; i++) {
					n += data.charCodeAt(i);

					let h = 0.02519603282416938 * n;

					n = h >>> 0;
					h -= n;
					h *= n;
					n = h >>> 0;
					h -= n;
					n += h * 4294967296; // 0x100000000      2^32
				}
				return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
			};

			mash.version = "Mash 0.9";
			return mash;
		}

		/* private: check if number is integer */
		function _isInteger(_int: any): boolean {
			return parseInt(_int, 10) === _int;
		}

		// Main random function
		const random = function (): number {
			const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

			s0 = s1;
			s1 = s2;

			return (s2 = t - (c = t | 0));
		} as AleaPRNG;

		random.fract53 = function (): number {
			return random() + ((random() * 0x200000) | 0) * 1.1102230246251565e-16; // 2^-53
		};

		random.int32 = function (): number {
			return random() * 0x100000000; // 2^32
		};

		random.cycle = function (_run?: number): void {
			_run = typeof _run === "undefined" ? 1 : +_run;
			if (_run < 1) {
				_run = 1;
			}
			for (let i = 0; i < _run; i++) {
				random();
			}
		};

		random.range = function (loBound: number, hiBound?: number): number {
			if (hiBound === undefined) {
				hiBound = loBound;
				loBound = 0;
			}

			if (loBound > hiBound) {
				const temp = loBound;
				loBound = hiBound;
				hiBound = temp;
			}

			// return integer
			if (_isInteger(loBound) && _isInteger(hiBound)) {
				return Math.floor(random() * (hiBound - loBound + 1)) + loBound;
				// return float
			} else {
				return random() * (hiBound - loBound) + loBound;
			}
		};

		random.restart = function (): void {
			_initState(initialArgs);
		};

		random.seed = function (...seedArgs: (string | number)[]): void {
			_initState(seedArgs);
		};

		random.version = function (): string {
			return version;
		};

		random.versions = function (): string {
			return version + ", " + mashver;
		};

		// when no seed is specified, create a random one from Windows Crypto (Monte Carlo application)
		if (args.length === 0) {
			window.crypto.getRandomValues(uinta);
			args = [uinta[0], uinta[1], uinta[2]];
		}

		// store the seed used when the RNG was instantiated, if any
		initialArgs = args;

		// initialize the RNG
		_initState(args);

		return random;
	})(Array.prototype.slice.call(arguments));
}
