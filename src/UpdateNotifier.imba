import { name, version } from '../package.json'
import fs from 'fs'
import https from 'https'
import os from 'os'
import path from 'path'
import type Version from '../types/Version'

export default class UpdateNotifier

	prop package\String = "https://registry.npmjs.org/-/package/{name}/dist-tags"
	prop directory\String = path.join os.homedir!, ".{name}"

	def constructor
		if self.shouldFetchLatestVersion!
			self.fetchLatestVersion!

	def shouldFetchLatestVersion
		const file = path.join directory, 'latest.json'

		if !fs.existsSync file then return true

		const fileDate = fs.statSync(file).mtime
		const currentDate = new Date

		const _FILE_DATE\Number = Date.UTC fileDate.getFullYear!, fileDate.getMonth!, fileDate.getDate!
		const _CURRENT_DATE\Number = Date.UTC currentDate.getFullYear!, currentDate.getMonth!, currentDate.getDate!
		const _MS_PER_DAY = 1000 * 60 * 60 * 24

		const shouldRefresh = Math.floor (_CURRENT_DATE - _FILE_DATE) / _MS_PER_DAY > 0

		if shouldRefresh then fs.unlinkSync file

		shouldRefresh

	def compareVersion latestVersion\String
		if version.trim! == latestVersion.trim! then return 0

		latestVersion.localeCompare(version) == 1

	def fetchLatestVersion
		const request = https.get self.package

		request.on 'response' do(response)
			if response.statusCode !== 200 then return

			let data = ''

			response.on 'data' do(chunk) data += chunk

			response.on 'end' do self.storeVersion data

		request.end!

		request.on 'error' do return

	def storeVersion data\String
		fs.writeFileSync path.join(directory, 'latest.json'), data

	def check callback\Function|Boolean = null
		if !fs.existsSync(path.join(self.directory, 'latest.json')) then return

		const response\Version = JSON.parse(fs.readFileSync(path.join(self.directory, 'latest.json')).toString!)

		if !self.compareVersion(response.latest) then return

		if callback && typeof callback == 'function'
			response.current = version

			return callback response

		const repeat = do(char\String) char.repeat(name.length * 2)

		console.log '┌─────────────────────────────────────────────────────' + repeat('─') + '─┐'
		console.log '│                                                      ' + repeat(' ') + '|'
		console.log "│  New version available: v{response.latest} (current: v{version})     " + repeat(' ') + '|'
		console.log "│  Run \u001B[32mnpm install -g {name}\u001B[0m or \u001B[32myarn global add {name}\u001B[0m to update!  |"
		console.log '|                                                      ' + repeat(' ') + '|'
		console.log '└──────────────────────────────────────────────────────' + repeat('─') + '┘'
