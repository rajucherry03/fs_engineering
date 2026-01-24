# Deploy Firestore Rules - Quick Guide

## The Problem
Your portfolio page shows "Permission denied" because the Firestore security rules haven't been deployed to Firebase yet.

## Quick Fix

### Method 1: Using Firebase CLI (Recommended)

1. **Open PowerShell or Terminal** in the `fs_engineering` folder

2. **Login to Firebase** (if not already logged in):
   ```bash
   firebase login
   ```

3. **Set your Firebase project**:
   ```bash
   firebase use --add
   ```
   - Select `consultancy-services-48b5d` from the list
   - Or set it directly:
   ```bash
   firebase use consultancy-services-48b5d
   ```

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Also deploy the indexes** (for the sortOrder query):
   ```bash
   firebase deploy --only firestore:indexes
   ```

### Method 2: Using Firebase Console (Web Interface)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **consultancy-services-48b5d**
3. Click on **Firestore Database** in the left menu
4. Go to the **Rules** tab
5. Copy the entire contents of `firestore.rules` file
6. Paste it into the rules editor
7. Click **Publish**

8. **For Indexes**:
   - Go to the **Indexes** tab
   - Click **Create Index** if needed
   - Or wait for Firebase to auto-create it when you use the query

## Verify Deployment

After deploying, refresh your portfolio page. The "Permission denied" error should be gone and projects should load.

## Current Rules Summary

The rules allow:
- ✅ **Public read access** to projects (anyone can view)
- ✅ **Admin-only write access** to projects
- ✅ **Public read access** to careers
- ✅ **Public create access** to contacts

This is the correct configuration for a public portfolio website.
